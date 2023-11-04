const express = require('express');

//-----------------------------------
const app = express();
app.use(express.json());
//-----------------------------------
//routes & controller
const productRoute = require('./routes/productRouter');
const userRoute = require('./routes/userRouter');

//-----------------------------------

app.use('/product',productRoute);   
app.use('/user',userRoute);
app.use('/picture',express.static('../public'));
// đường dẫn của 1 file ảnh là: /Livingroom/maimz_Sofa/img1.webp
//-----------------------------------
module.exports = app;