const express = require("express");
const cors = require("cors");

//-----------------------------------
const app = express();
app.use(express.json());
const corsOption = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOption)); // sau này chỉnh lại thành đg dẫn mặc định

//-----------------------------------
//routes & controller
const productRoute = require("./routes/productRouter");
const userRoute = require("./routes/userRouter");

//-----------------------------------

app.use("/api/product", productRoute);
app.use("/api/user", userRoute);
app.use("/api/picture", express.static("public"));
// đường dẫn của 1 file ảnh là: /Livingroom/maimz_Sofa/img1.webp
//-----------------------------------
module.exports = app;
