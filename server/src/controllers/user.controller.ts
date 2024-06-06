import mongoose from "mongoose";
import { Request,Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import ApiError from "../utils/ApiError";
import { User,IUser } from "../models/user.model";
import { Post } from "../models/post.model";
import ApiResponse from "../utils/ApiResponse";

interface CustomRequest<T = any> extends Request {
    body: T;
    user?: IUser;
}

interface RegisterUserRequest {
    email: string;
    password: string;
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
    const { email, password } = req.body;

    if (!(email && password)) {
        throw new ApiError(401, "All fields required");
    }
    const existedUser = await User.findOne({ email });
    if (existedUser) {
        throw new ApiError(401, "User already exists");
    }
    const newUser = await User.create({
        email,
        password,
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

    const user = await User.findByIdAndUpdate(
        req.user._id,
        { profilePicture: req.file.path },
        { new: true, runValidators: true }
    ).select('-password -refreshToken');

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    res.status(200).json(new ApiResponse(200, user, "Profile image updated successfully"));
});

const updateProfile = asyncHandler(async (req: Request, res: Response) => {
    const updates = req.body;

    const user = await User.findByIdAndUpdate(
        req.user._id,
        updates,
        { new: true, runValidators: true }
    ).select('-password -refreshToken');

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    res.status(200).json(new ApiResponse(200, user, "Profile updated successfully"));
});

const updateCoverImage = asyncHandler(async (req: Request, res: Response) => {
    if (!req.file) {
        throw new ApiError(400, "No file uploaded");
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        { coverImage: req.file.path },
        { new: true, runValidators: true }
    ).select('-password -refreshToken');

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

    const user = await User.findById(currentUserId).populate('followers', 'username profilePicture');
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const followers = user.followers;

    res.status(200).json(new ApiResponse(200, followers, "Followers retrieved successfully"));
});
const getFollowing = asyncHandler(async (req: Request, res: Response) => {
    const currentUserId = req.user?._id;

    const user = await User.findById(currentUserId).populate('following', 'username profilePicture');
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
    const { userId } = req.params;
    const currentUserId = req.user?._id;
    
    if (userId === currentUserId.toString()) {
        throw new ApiError(400, "You cannot follow yourself");
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (!user.followers.includes(currentUserId)) {
        user.followers.push(currentUserId);
        await user.save();
    }
    const userIdObject = new mongoose.Types.ObjectId(userId);
    const currentUser = await User.findById(currentUserId);
    if (currentUser && !currentUser.following.includes(userIdObject)) {
        currentUser.following.push(userIdObject);
        await currentUser.save();
    }

    res.status(200).json(new ApiResponse(200, null, "User followed successfully"));
});

const unfollowUser = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const currentUserId = req.user?._id;
    
    if (userId === currentUserId.toString()) {
        throw new ApiError(400, "You cannot unfollow yourself");
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    user.followers = user.followers.filter(follower => !follower.equals(currentUserId));
    await user.save();

    const currentUser = await User.findById(currentUserId);
    if (currentUser) {
        currentUser.following = currentUser.following.filter(following => !following.equals(userId));
        await currentUser.save();
    }

    res.status(200).json(new ApiResponse(200, null, "User unfollowed successfully"));
});

const searchUsers = asyncHandler(async (req: Request, res: Response) => {
    const { query } = req.query;
    const users = await User.find({
        username: { $regex: query, $options: "i" }
    }).select("-password -refreshToken");
    
    res.status(200).json(new ApiResponse(200, users));
});

const getUserPosts = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const posts = await Post.find({ author: userId }).populate('author', '-password -refreshToken');

    res.status(200).json(new ApiResponse(200, posts));
});

const validateToken = asyncHandler(async (req: Request, res: Response) => {
    // res.status(200).json({ isValid: true, user: req.user });
})

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
}