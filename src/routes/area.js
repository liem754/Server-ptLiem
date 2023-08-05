import * as routerArea from "../controller/area";
import express from "express";

const router = express.Router();
router.get("/all", routerArea.getArea);
export default router;
