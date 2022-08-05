const mongoose = require("mongoose");

// const OrderSchema = new mongoose.Schema(
//     {
//         userId:{type:String,required:true},
//         products:[
//             {
//                 productId:{type:String},
//                 quantity:{type:Number,default:1},
//             }
//         ],
//         amount:{type:Number,required:true},
//         address:{type:Object,required:true},
//         status:{type:String,default:"pending"}
//     },
//     {timestamps:true}
// );

const OrderSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    cartId:{type:String,required:true},
    amount:{type:Number,required:true},
    address:{type:Object,required:true},
    status:{type:String,default:"pending"}
},{timestamps:true});



module.exports = mongoose.model("Order",OrderSchema);
