import mongoose, { Schema, Document, Model } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    username: string;
    fullName: string;
    email: string;
    password: string;
    bio: string;
    profileImage: string;
    coverImage: string;
    birthdate: Date;
    posts: mongoose.Types.ObjectId[];
    followers: mongoose.Types.ObjectId[];
    following: mongoose.Types.ObjectId[];
    isCorrectPassword(password: string): Promise<boolean>;
    generateRefreshToken(): string;
    generateAccessToken(): string;
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        unique: true,
        trim: true,
        index: true,
    },
    fullName: String,
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // You may want to implement stronger password policies
    },
    bio: {
        type: String,
        maxlength: 160, // A common limit for bio in social media apps
        default: "",
    },
    profileImage: String,
    coverImage: String,
    birthdate: Date,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        default: [],
        ref: 'User',
    }],
}, { timestamps: true });


userSchema.pre<IUser>("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isCorrectPassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateRefreshToken = function (): string {
    return jwt.sign({
        _id: this._id,
    },
        process.env.REFRESH_TOKEN_SECRET!,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY!,
        }
    );
};

userSchema.methods.generateAccessToken = function (): string {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET!,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY!,
        }
    );
};

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

