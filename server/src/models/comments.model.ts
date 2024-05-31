import mongoose,{Document} from "mongoose";

interface IComment extends Document{
    user: mongoose.Types.ObjectId,
    post: mongoose.Types.ObjectId,
    content: string,
}

const commentSchema = new mongoose.Schema<IComment>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    content: {
        type: String,
        required: true
    },
}, { timestamps: true });

export const Comment = mongoose.model<IComment>('Comment', commentSchema);

