import mongoose from "mongoose";
import { Request,Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import ApiError from "../utils/ApiError";
import { User,IUser } from "../models/user.model";
import { Post } from "../models/post.model";
import ApiResponse from "../utils/ApiResponse";
import { uploadOnCloudinary } from "../utils/fileUpload.cloudinary";

interface CustomRequest<T = any> extends Request {
    body: T;
    user?: IUser;
}

interface RegisterUserRequest {
    email: string;
    password: string;
    fullName: string;
    username: string;
}

const generateRefreshAndAccessToken = async (user : any) => {
    try {
        const accessToken = user.generateAccessToken();

        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return {accessToken };
    } catch (error) {
        throw new ApiError(500, "Error to generate tokens")
    }
}

const createUser = asyncHandler(async (req: CustomRequest<RegisterUserRequest>, res: Response) => {
    const { email, password,fullName,username } = req.body;

    if (!(email && password && fullName && username)) {
        throw new ApiError(401, "All fields required");
    }
    const existedUser = await User.findOne(
        {
            $or: [{username},{email}]
        }
    );
    if (existedUser) {
        throw new ApiError(401, "User already exists");
    }
    const defaultProfileImage = "https://res.cloudinary.com/dslmpkxrs/image/upload/v1718555641/profileImg_yhr1xm.png"
    const newUser = await User.create({
        email,
        password,
        fullName,
        username,
        profilePicture: defaultProfileImage,
    });
    if (!createUser) {
        throw new ApiError(501, "Something went wrong");
    }
    return res.status(201).json(new ApiResponse(201, newUser, "User Created Successfully"))
})

const logUser = asyncHandler(async (req: CustomRequest<RegisterUserRequest>, res: Response) => {
    const { email, password } = req.body;

    if (!(email && password)) {
        throw new ApiError(401, "All fields required");
    }
    const createdUser = await User.findOne({ email });
    if (!createdUser) {
        throw new ApiError(401, "Email doesn't exists");
    }

    const isPasswordCorrect = await createdUser.isCorrectPassword(password);
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Incorrect Password");
    }
    const { accessToken } = await generateRefreshAndAccessToken(createdUser);
    const loggedUser = await User.findById(createdUser._id).select("-password -refreshToken");
    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .jsonp(new ApiResponse(201, loggedUser));
 })

const logoutUser = asyncHandler(async (req: Request, res: Response) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined,
            }
        },
        {
            new: true,
        }
    );
    const options = {
        httpOnly: true,
        secure: true,
    }
    return res.status(201)
        .clearCookie("accessToken", options)
        .json(new ApiResponse(200, {}, "user Logged out"))
})

const updateProfileImage = asyncHandler(async (req: Request, res: Response) => {
    if (!req.file) {
        throw new ApiError(400, "No file uploaded");
    }
    const profileImage = req.file.path as string;
    const uploaded = await uploadOnCloudinary(profileImage);
    console.log(uploaded,profileImage);
    
    if (!uploaded || !uploaded.url) {
        throw new ApiError(501, "something went wrong while upload image on cloudinary");
    }
    const user = await User.findByIdAndUpdate(
        req.user._id,
        { profilePicture: uploaded.url },
        { new: true, runValidators: true }
    ).select('-password -refreshToken');

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    res.status(200).json(new ApiResponse(200, user, "Profile image updated successfully"));
});

const updateProfile = asyncHandler(async (req: Request, res: Response) => {
    const {bio,username,fullName} = req.body;
    console.log(bio,username,fullName);
    
    const user = await User.findByIdAndUpdate(
        req.user._id,
        {username},
        { new: true, runValidators: true }
    ).select('-password -refreshToken -creadedAt -updatedAt -email -_id');

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    res.status(200).json(new ApiResponse(200, user, "Profile updated successfully"));
});

const updateCoverImage = asyncHandler(async (req: Request, res: Response) => {
    if (!req.file) {
        throw new ApiError(400, "No file uploaded");
    }
    const coverImage = req.file.path as string;
    const uploaded = await uploadOnCloudinary(coverImage);

    if (!uploaded || !uploaded.url) {
        throw new ApiError(501, "something went wrong while upload image on cloudinary");
    }
    const user = await User.findByIdAndUpdate(
        req.user._id,
        { coverImage: uploaded.url },
        { new: true, runValidators: true }
    ).select('-password -refreshToken -email -_id -createdAt -updatedAt');

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    res.status(200).json(new ApiResponse(200, user, "Cover image updated successfully"));
});

const changePassword = asyncHandler(async (req:Request, res:Response) => {
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
        throw new ApiError(401, "All fields required");
    }
    const isOldPasswordValid = req.user.isCorrectPassword(oldPassword);
    if (!isOldPasswordValid) {
        throw new ApiError(401, "Incorrect password");
    }

    req.user.password = newPassword;
    await req.user.save({ validateBeforeSave: false });
    return res.status(201).json(new ApiResponse(201, {}));
})

const getFollowers = asyncHandler(async (req: Request, res: Response) => {
    const currentUserId = req.user?._id;

    // Find the user and populate followers and following using aggregation
    const result = await User.aggregate([
        { $match: { _id: currentUserId } },
        {
            $lookup: {
                from: "users",
                localField: "followers",
                foreignField: "_id",
                as: "followers"
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "following",
                foreignField: "_id",
                as: "following"
            }
        },
        {
            $addFields: {
                followers: {
                    $map: {
                        input: "$followers",
                        as: "follower",
                        in: {
                            username: "$$follower.username",
                            fullName: "$$follower.fullName",
                            profilePicture: "$$follower.profilePicture",
                            isFollowed: { $in: ["$$follower._id", "$following._id"] }
                        }
                    }
                }
            }
        },
        {
            $project: {
                followers: 1,
                _id: 0
            }
        }
    ]);

    if (!result || result.length === 0) {
        throw new ApiError(404, "User not found");
    }

    const followersWithFollowStatus = result[0].followers;

    res.status(200).json(new ApiResponse(200, followersWithFollowStatus, "Followers retrieved successfully"));
});

const getFollowing = asyncHandler(async (req: Request, res: Response) => {
    const currentUserId = req.user?._id;

    const user = await User.findById(currentUserId).populate('following', 'username fullName profilePicture');
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const following = user.following;

    res.status(200).json(new ApiResponse(200, following, "Following retrieved successfully"));
});

const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const user = await User.findById(userId).select("-password -refreshToken");
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    res.status(200).json(new ApiResponse(200, user));

});

const followUser = asyncHandler(async (req: Request, res: Response) => {
    const { username } = req.params;
    
    const currentUser = req.user;
    if (username === currentUser.username) {
        throw new ApiError(400, "You cannot follow yourself");
    }

    const user = await User.findOne({username});
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (!user.followers.includes(currentUser._id)) {
        user.followers.push(currentUser._id);
        await user.save();
    }
    
    if (currentUser && !currentUser.following.includes(user._id)) {
        currentUser.following.push(user._id);
        await currentUser.save();
    }

    res.status(200).json(new ApiResponse(200, null, "User followed successfully"));
});

const unfollowUser = asyncHandler(async (req: Request, res: Response) => {
    const { username } = req.params;
    const currentUser = req.user as IUser | undefined;

    if (!currentUser) {
        throw new ApiError(401, 'Unauthorized');
    }

    if (username === currentUser.username) {
        throw new ApiError(400, 'You cannot unfollow yourself');
    }

    const user = await User.findOne({ username });
    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    // Update followers of the user being unfollowed
    await User.findByIdAndUpdate(
        user._id,
        { $pull: { followers: currentUser._id } }
    );

    // Update following of the current user
    await User.findByIdAndUpdate(
        currentUser._id,
        { $pull: { following: user._id } },
        { new: true } // To return the updated document
    );

    res.status(200).json(new ApiResponse(200, null, 'User unfollowed successfully'));
});
  
  


const isFollowed = asyncHandler(async (req: Request, res: Response) => {
    const { username } = req.params;
    const searchedUser = await User.findOne({ username });
    if (!searchedUser) {
        throw new ApiError(401, "Username doesn't exists");
    }
    const currentUser = req.user;

    const isFollowing = currentUser.following.find((following:mongoose.Types.ObjectId[]) => following === searchedUser._id);

    res.status(200).json(new ApiResponse(200, { isFollowing }));
});

const searchUsers = asyncHandler(async (req: Request, res: Response) => {
    const { query } = req.query;
    console.log(query);
    
    const users = await User.find({
        username: { $regex: query, $options: "i" }
    }).select("-password -refreshToken -email -createdAt -updatedAt");
    
    
    res.status(200).json(new ApiResponse(200, users));
});

const getUserPosts = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const posts = await Post.find({ author: userId }).populate('author', '-password -refreshToken');

    res.status(200).json(new ApiResponse(200, posts));
});

const validateToken = asyncHandler(async (req: Request, res: Response) => {
    
    res.status(200).json({ isValid: true, user: req.user });
})

const getSuggestedUsers = asyncHandler(async (req: Request, res: Response) => {
    const currentUser = req.user;

    // Get users that the current user is not following and exclude the current user
    const suggestedUsers = await User.find({
        _id: { $ne: currentUser._id, $nin: currentUser.following }
    }).select('-password -refreshToken -email -createdAt -updatedAt');

    res.status(200).json(new ApiResponse(200, suggestedUsers, "Suggested users retrieved successfully"));
});

export {
    validateToken,
    getUserProfile,
    followUser,
    unfollowUser,
    searchUsers,
    getUserPosts,
    getFollowers,
    getFollowing,
    updateProfileImage,
    changePassword,
    updateCoverImage,
    updateProfile,
    createUser,
    logUser,     
    logoutUser,
    getSuggestedUsers,
}