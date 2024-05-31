import {Router} from "express"
import {
    likePost,
    unlikePost,
    getPostLikes,
} from "../controllers/likes.controller";
import { verifyJWT } from "../middlewares/auth.middleware";
const router = Router();

router.route("/:postId/likePost").post(verifyJWT,likePost);
router.route("/:postId/unLikePost").delete(verifyJWT,unlikePost);
router.route("/:postId").get(verifyJWT,getPostLikes);

export default router;