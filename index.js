const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require('dotenv');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
dotenv.config();


mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("System is now connected to database");
}).catch(err=>{
    console.log(`there is an error in database connection ${err}`);
});

app.use(express.json());
app.use('/api/users',userRoute);
app.use('/api/auth',authRoute);

app.listen(process.env.PORT ||  8080,()=>{
    console.log("Backend server is running");
});