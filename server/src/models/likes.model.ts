import mongoose, { Schema, Document } from "mongoose";

interface ILike extends Document {
    user: mongoose.Types.ObjectId;
    post: mongoose.Types.ObjectId;
}

const likeSchema = new Schema<ILike>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    }
}, { timestamps: true });

export const Like = mongoose.model<ILike>('Like', likeSchema);

