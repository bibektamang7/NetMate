import cookieParser from "cookie-parser"
import express from "express"
import cors from "cors"

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.routes"
import likesRouter from "./routes/likes.routes"
import postRouter from "./routes/post.routes"
import commentsRouter from "./routes/comments.routes"
import sharesRouter from "./routes/shares.routes"

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentsRouter);
app.use("/likes", likesRouter);
app.use("/shares", sharesRouter);

export default app
