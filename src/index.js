const express = require('express');
const dotenv = require('dotenv');
const moogose = require('mongoose');
//-----------------------------------
//-----------------------------------
const app = express();
dotenv.config();
app.use(express.json());

moogose
    .connect(process.env.MONGO_URL)
    .then(console.log("Connected to MongoDB"))
    .catch(err => console.log(err));

//-----------------------------------

app.get('/',(req,res) => {
    res.send("hello world")
})




//-----------------------------------
app.listen(process.env.PORT,()=>{
    console.log("Server is running on http://localhost:5000");
});