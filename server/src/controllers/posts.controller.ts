import { asyncHandler } from "../utils/asyncHandler";
import { Post } from "../models/post.model";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import { Request, Response } from "express";

// Create a new post
const createPost = asyncHandler(async (req: Request, res: Response) => {
    const {content, author } = req.body;

    if (!content || !author) {
        throw new ApiError(400, "All fields are required");
    }

    const post = new Post({
        content,
        author,
    });

    await post.save();

    return res.status(201).json(new ApiResponse(201, post, "Post created successfully"));
});

// Get a single post by ID
const getPost = asyncHandler(async (req: Request, res: Response) => {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    return res.status(200).json(new ApiResponse(200, post));
});

// Get all posts
const getPosts = asyncHandler(async (req: Request, res: Response) => {
    const posts = await Post.find();

    return res.status(200).json(new ApiResponse(200, posts));
});

// Update a post by ID
const updatePost = asyncHandler(async (req: Request, res: Response) => {
    const { postId } = req.params;
    const { content } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    if (content) post.content = content;

    await post.save();

    return res.status(200).json(new ApiResponse(200, post, "Post updated successfully"));
});

// Delete a post by ID
const deletePost = asyncHandler(async (req: Request, res: Response) => {
    const { postId } = req.params;

    const post = await Post.findById(postId);
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
