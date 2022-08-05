const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require('dotenv');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const prodRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
dotenv.config();


mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("System is now connected to database");
}).catch(err=>{
    console.log(`there is an error in database connection ${err}`);
});

app.use(express.json());
app.use('/api/users',userRoute);
app.use('/api/auth',authRoute);
app.use('/api/products',prodRoute);
app.use('/api/cart',cartRoute);
app.use('/api/order',orderRoute);

app.listen(process.env.PORT ||  8080,()=>{
    console.log("Backend server is running");
});