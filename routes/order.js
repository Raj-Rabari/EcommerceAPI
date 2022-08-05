const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require("./verifyToken");
const Order = require("../models/Order");
const router = require("express").Router();

router.post("/",verifyToken,async (req,res)=>{
    const order = new Order(req.body);
    try{
        const newOrder = await order.save();
        res.status(200).json(newOrder);
    }catch(err){
        res.status(500).json(err);
    }
});

router.get("/:id",verifyTokenAndAuthorization,async (req,res)=>{
    try{
        const order = await Order.find({id:req.params.id});
        // const order = await Order.aggregate([{$lookup:{from:"carts",localField:"cartId",foreignField:"_id",as:"cart"}}]);
        res.status(200).json(order);
    }catch(err){
        res.status(500).json(err);
    }
});

router.get("/",verifyTokenAndAdmin,async (req,res)=>{
    try{
        const orders = await Order.find();
        res.status(200).json(ordes);
    }catch(err){
        res.status(200).json(err);
    }
});



module.exports = router;