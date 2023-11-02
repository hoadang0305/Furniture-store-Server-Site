const express = require('express');
const dotenv = require('dotenv');
const moogose = require('mongoose');
//-----------------------------------
//routes & controller
const productRoute = require('./routes/productRouter');
const userRoute = require('./routes/userRouter');
//-----------------------------------
const app = express();
dotenv.config();
app.use(express.json());

moogose
    .connect(process.env.MONGO_URL)
    .then(console.log("Connected to MongoDB"))
    .catch(err => console.log(err));

//-----------------------------------

app.use('/product',productRoute);
app.use('/user',userRoute);
//-----------------------------------
app.listen(process.env.PORT,()=>{
    console.log("Server is running on http://localhost:5000");
});