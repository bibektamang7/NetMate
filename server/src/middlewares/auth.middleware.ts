import jwt from "jsonwebtoken"
import { User } from "../models/user.model"
import ApiError from "../utils/ApiError"
import { asyncHandler } from "../utils/asyncHandler"

interface JwtPayload{
    _id: string,
    email: string,
}

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "");
        if (!token) {
            throw new ApiError(401,"unauthorized request")
        }
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET) as JwtPayload;
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
        if (!user) {
            throw new ApiError(401, "Invalid access token");
        }
        req.user = user;
        next();
    } catch (error:any) {
        throw new ApiError(401,error?.message || "Invalid access token")
    }
})