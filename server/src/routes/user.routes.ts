import {Router} from "express"
import {
    changePassword,
    createUser,
    logUser,
    logoutUser,
    updateCoverImage,
    updateProfile,
    updateProfileImage,
    getFollowers,
    getFollowing,
    getUserProfile,
    followUser,
    unfollowUser,
    searchUsers,
    getUserPosts
} from "../controllers/user.controller";
import { verifyJWT } from "../middlewares/auth.middleware";
import upload from "../middlewares/multer.middleware";

const router = Router();

router.route("/createUser").post(createUser)
router.route("/login").post(logUser);
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/changePassword").post(verifyJWT,changePassword);
router.route("/updateProfile").post(verifyJWT,updateProfile);
router.route("/updateProfileImage").post(verifyJWT,upload.single("profileImage"),updateProfileImage)
router.route("/updateCoverImage").post(verifyJWT,upload.single("coverImage"),updateCoverImage);
router.route("/followers").get(verifyJWT, getFollowers);
router.route("/following").get(verifyJWT, getFollowing);
router.route("/profile/:userId").get(verifyJWT, getUserProfile);
router.route("/follow/:userId").post(verifyJWT, followUser);
router.route("/unfollow/:userId").post(verifyJWT, unfollowUser);
router.route("/search").get(verifyJWT, searchUsers);
router.route("/:userId/posts").get(verifyJWT, getUserPosts);

export default router;