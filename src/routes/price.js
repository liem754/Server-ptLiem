import * as routerPrice from "../controller/price";
import express from "express";

const router = express.Router();
router.get("/all", routerPrice.getPrice);
export default router;
