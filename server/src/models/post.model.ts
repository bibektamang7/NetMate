import mongoose,{Schema,Document} from "mongoose";

interface IPost extends Document{
    author: mongoose.Types.ObjectId,
    content: string,
    postImage: string,
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
        required: true,
    },

}, { timestamps: true });
 
export const Post = mongoose.model<IPost>("Post", postSchema);