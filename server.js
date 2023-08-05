import express from "express";
import initRoutes from "./src/routes";
require("dotenv").config();
import cors from "cors";
import connectDatabase from "./src/config/conectDatabase";
import generCode from "./src/ultis/generCode";
import { getNumberFromString } from "./src/ultis/common";
// console.log(generCode("Thành phố Hà Nội"));
console.log(getNumberFromString("25m5"));
const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST", "GET", "PUT", "DELETE"],
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
initRoutes(app);
connectDatabase();
const port = process.env.PORT || 8888;
const listener = app.listen(port, () => {
  console.log(`Server is running on the post ${listener.address().port}`);
});
//// tạo database trong config,migration,models
/// viết api trong services,router,controller
