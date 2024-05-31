import {Router} from "express"
import {
    sharePost,
    getPostShares,
} from "../controllers/shares.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

router.route("/:postId/sharePost").post(verifyJWT,sharePost);
router.route("/:postId/getPostShares").get(verifyJWT,getPostShares);

export default router;