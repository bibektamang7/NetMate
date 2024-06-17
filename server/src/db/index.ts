import { DB_NAME } from "../constants";
import mongoose from "mongoose";

import { User } from "../models/user.model";

const updateSchema = async () => {
    try {
        // const res = await User.updateMany({}, {
        //     $set: {
        //         fullName: ""
        //     }
        // })
    } catch (error) {
        
    }
}

export const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        // updateSchema();
    } catch (error) {
        console.log("MONGODB CONNECTION ERROR");
    }
}
