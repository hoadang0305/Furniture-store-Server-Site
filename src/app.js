const express = require('express');
const cors = require('cors');
const {errorResposerHandler, invalidPathHandler} = require('./middleware/errorHandler');
require('express-async-errors');

//-----------------------------------
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOption = {
    origin: "http://localhost:3000",
    credentials: true
}
app.use(cors(corsOption));// sau này chỉnh lại thành đg dẫn mặc định

//-----------------------------------
//routes & controller
const productRoute = require('./routes/productRouter');
const userRoute = require('./routes/userRouter');
const cartRoute = require('./routes/cartRouter');

//-----------------------------------

app.use('/api/product',productRoute);
app.use('/api/user',userRoute);
app.use('/api/cart', cartRoute);
app.use('/api/picture',express.static('public'));

app.use(invalidPathHandler);
app.use(errorResposerHandler);
// đường dẫn của 1 file ảnh là: /Livingroom/maimz_Sofa/img1.webp
//-----------------------------------
module.exports = app;
