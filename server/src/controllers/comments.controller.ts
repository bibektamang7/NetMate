import { Request,Response } from "express";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { Comment } from "../models/comments.model";
interface CustomRequest<T = any> extends Request {
    body: T;
}

interface RegisterCommentRequest {
    comment: string,
}

const createComment = asyncHandler(async (req: CustomRequest<RegisterCommentRequest>, res: Response) => {
    const { comment } = req.body;
    const { postId } = req.params;
    if (!comment) {
        throw new ApiError(401, "Comment is required");
    }
    const createdComment = await Comment.create({
        user: req.user._id,
        postId,
        content: comment,
    });
    if (!createdComment) {
        throw new ApiError(501, "Something went wrong");
    }
    return res
        .status(201)
        .json(new ApiResponse(201, {}));
});



const getCommentsByPost = asyncHandler(async (req: CustomRequest<RegisterCommentRequest>, res: Response) => {
    const { postId } = req.params;
    const comments = await Comment.find({
        post: postId,
    });
    if (!comments) {
        throw new ApiError(501, "Something went wrong");
    }
    return res
        .status(201)
        .json(new ApiResponse(201, {}));
});


const deleteComment = asyncHandler(async (req:Request, res: Response) => {
    const { commentId } = req.params;
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
        throw new ApiError(501, "Something went wrong");
    }
    return res
        .status(201)
        .json(new ApiResponse(201, {}));
})


export {
    createComment,
    getCommentsByPost,
    deleteComment,
}