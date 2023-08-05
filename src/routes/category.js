import * as routerCategory from "../controller/category";
import express from "express";
const router = express.Router();
router.get("/all", routerCategory.getCategory);
export default router;
