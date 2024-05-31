import { asyncHandler } from "../utils/asyncHandler";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import { Request,Response } from "express";
import { Like } from "../models/likes.model";

const likePost = asyncHandler(async (req:Request, res:Response) => {
    const { postId } = req.params;
    const existingLike = await Like.findOne({
        post: postId,
        user: req.user._id,
    });
    if (existingLike) {
        throw new ApiError(400, "Post already liked");
    }
    const like = await Like.create({
        post: postId,
        user: req.user._id,
    });
    if (!like) {
        throw new ApiError(500, "Something went wrong");
    }
    return res
        .status(201)
        .json(new ApiResponse(201, null));
})

const unlikePost = asyncHandler(async (req:Request, res:Response) => {
    const { postId } = req.params;
    const like = await Like.findOne({
        post: postId,
        user: req.user._id,
    });
    if (!like) {
        throw new ApiError(400, "Post not liked yet");
    }

    await like.deleteOne();

    return res.status(200).json(new ApiResponse(200, null, "Post unliked successfully"))
})

const getPostLikes = asyncHandler(async (req:Request, res:Response) => {
    const { postId } = req.params;

    const likes = await Like.find({ post: postId }).populate('user', '-password -refreshToken -email');

    return res.status(200).json(new ApiResponse(200, likes, "Post likes retrieved successfully"));
})

export {
    likePost,
    unlikePost,
    getPostLikes,
}