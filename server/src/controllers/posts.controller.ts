import { asyncHandler } from "../utils/asyncHandler";
import { Post, IPost } from "../models/post.model";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import { Response, Request } from "express";
import { uploadOnCloudinary } from "../utils/fileUpload.cloudinary";
import { UploadApiResponse } from "cloudinary";
import { IUser } from "../models/user.model";
interface CustomRequest extends Request {
    body: {
        content: string;
        author: string;
        visibility?: "public" | "private" | "friends";
    },
    files?: {
        postImage?: Express.Multer.File[]; // Existing definition
    },
}



// Create a new post
const createPost = asyncHandler(async (req: Request, res: Response) => {
    const customReq = req as CustomRequest;
    const { content, visibility } = customReq.body;
    console.log(content, visibility);

    if (!(content || visibility || customReq.file)) {
        throw new ApiError(400, "All fields are empty");
    }
    const postImage = customReq.file?.path as string;
    let uploaded: UploadApiResponse | null = null;
    if (postImage) {
        uploaded = await uploadOnCloudinary(postImage);
        if (!uploaded || !uploaded.url) {
            throw new ApiError(501, "something went wrong while upload image on cloudinary");
        }
    }

    const post: IPost = new Post({
        content: content || "",
        author: req.user._id,
        postImage: uploaded?.url,
        visibility
    });

    await post.save();

    return res.status(201).json(new ApiResponse(201, post, "Post created successfully"));
});

// Get a single post by ID
const getPost = asyncHandler(async (req: Request, res: Response) => {
    const { postId } = req.params;

    const post: IPost | null = await Post.findById(postId);
    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    return res.status(200).json(new ApiResponse(200, post));
});

// Get all posts
const getPosts = asyncHandler(async (req: Request, res: Response) => {
    const currentUser = req.user as IUser;
    // const posts: IPost[] = await Post.find({
    //     author: { $ne: currentUser._id },
    // }).populate("author","-_id username profileImage fullName")

    const pipeline = [
        {
            $match: { author: { $ne: currentUser._id } }, // Filter posts excluding current user
        },
        {
            $lookup: {
                from: "users", // Reference the User collection
                localField: "author", // Field in the Post document referencing the user
                foreignField: "_id", // Field in the User document being matched
                as: "author", // Alias for the populated author data
            },
        },
        {
            $unwind: "$author",
        },
        {
            $project: {
                // Project desired fields (exclude unnecessary ones)
                _id: 1, // Include post ID if needed
                postImage: 1,
                visibility: 1,
                content: 1,
                // ... other post fields
                author: {
                    profileImage: "$author.profilePicture",
                    username: "$author.username",
                    fullName: "$author.fullName",
                }
            },
        },
    ];

    const posts = await Post.aggregate(pipeline);

    return res.status(200).json(new ApiResponse(200, posts));
});

// Update a post by ID
const updatePost = asyncHandler(async (req: Request, res: Response) => {
    const { postId } = req.params;
    const { content, visibility } = req.body;

    const post: IPost | null = await Post.findById(postId);
    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    if (content) post.content = content;
    if (visibility) post.visibility = visibility;

    await post.save();

    return res.status(200).json(new ApiResponse(200, post, "Post updated successfully"));
});

// Delete a post by ID
const deletePost = asyncHandler(async (req: Request, res: Response) => {
    const { postId } = req.params;

    const post: IPost | null = await Post.findById(postId);
    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    await post.deleteOne();

    return res.status(200).json(new ApiResponse(200, null, "Post deleted successfully"));
});

export {
    createPost,
    getPost,
    getPosts,
    updatePost,
    deletePost,
};
