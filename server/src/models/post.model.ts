import mongoose,{Schema,Document} from "mongoose";

export interface IPost extends Document{
    author: mongoose.Types.ObjectId,
    content: string,
    postImage: string,
    visibility: "public" | "private" | "friends";
}

const postSchema = new Schema<IPost>({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
    },
    postImage: {
        type: String,
    },
    visibility: {
        type: String,
        enum: ["public", "private", "friends"],
        default: "public",
    }
    
}, { timestamps: true });
 
export const Post = mongoose.model<IPost>("Post", postSchema);