import * as routerPost from "../controller/post";
import * as updatePost from "../controller/update";
import express from "express";
import verifyToken from "../middlewares/verifyToken";
const router = express.Router();
router.get("/all", routerPost.getPost);
router.get("/limit", routerPost.getLimitPost);
router.get("/new", routerPost.getNewPost);

router.use(verifyToken);
router.post("/create-new-post", routerPost.createNewPost);
router.get("/limit-admin", routerPost.getPostLimitAdmin);
router.put("/update-post", updatePost.update);
router.delete("/delete-post", routerPost.delePost);
export default router;
