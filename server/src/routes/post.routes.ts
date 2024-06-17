import { Router } from "express"
import upload from "../middlewares/multer.middleware";
import {
    createPost,
    getPost,
    getPosts,
    updatePost,
    deletePost,
} from "../controllers/posts.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

router.route("/createPost").post(verifyJWT,upload.single("postImage"),createPost);
router.route("/getPost/:postId").get(verifyJWT,getPost);
router.route("/getPosts").get(verifyJWT,getPosts);
router.route("/updatePost/:postId").patch(verifyJWT,updatePost);
router.route("/deletePost/:postId").delete(verifyJWT,deletePost);

export default router;