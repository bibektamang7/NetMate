import { DB_NAME } from "../constants";
import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
    } catch (error) {
        console.log("MONGODB CONNECTION ERROR");
    }
}
