import * as getOneRouter from "../controller/user";
import * as updateAd from "../controller/update";
import express from "express";
import verifyToken from "../middlewares/verifyToken";
const router = express.Router();
router.use(verifyToken);
router.get("/one", getOneRouter.getOne);
router.put("/update-admin", updateAd.updateAd);
export default router;
