import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import { Share } from "../models/shares.model";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";

// Share a post
const sharePost = asyncHandler(async (req: Request, res: Response) => {
    const { postId } = req.params;
    
    // Check if the user has already shared the post
    const existingShare = await Share.findOne({ post: postId, user: req.user._id });
    if (existingShare) {
        throw new ApiError(400, "Post already shared");
    }

    const share = new Share({
        user: req.user._id,
        post: postId,
    });

    await share.save();

    return res.status(201).json(new ApiResponse(201, share, "Post shared successfully"));
});

const getPostShares = asyncHandler(async (req: Request, res: Response) => {
    const { postId } = req.params;


    const shares = await Share.find({ post: postId }).populate('user', '-password -email -refreshToken');

    return res.status(200).json(new ApiResponse(200, shares));
});

export {
    sharePost,
    getPostShares,
};
