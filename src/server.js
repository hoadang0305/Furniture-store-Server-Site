const app = require('./app');
const dotenv = require('dotenv');
const moogose = require('mongoose');

dotenv.config();

moogose
    .connect(process.env.MONGO_URL)
    .then(console.log("Connected to MongoDB"))
    .catch(err => console.log(err));

//-----------------------------------
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});