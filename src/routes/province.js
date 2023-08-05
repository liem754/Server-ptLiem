import * as getProvinceController from "../controller/province";
import express from "express";
const router = express.Router();
router.get("/all", getProvinceController.getProvince);
export default router;
