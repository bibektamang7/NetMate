import {Router} from "express"
import {
    createComment,
    getCommentsByPost,
    deleteComment,
} from "../controllers/comments.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

router.route("/:postId/createComment").post(verifyJWT,createComment)
router.route("/:postId/getComments").get(verifyJWT,getCommentsByPost);
router.route("/:commentId/delete").delete(verifyJWT,deleteComment);

export default router;