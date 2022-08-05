const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require("./verifyToken");
const Cart = require("../models/Cart");
const { findOneAndUpdate, findOneAndDelete } = require("../models/User");
const router = require("express").Router();

router.post("/",verifyToken,async (req,res)=>{
    const cart = new Cart(req.body);
    console.log("iside post");
    try{
        console.log("inside try");
        const newCart = await cart.save();
        res.status(200).json(newCart);
    }catch(err){
        res.status(500).json(err);
    }
});

router.get("/:id",verifyTokenAndAuthorization,async (req,res)=>{
    try{
        const cart = await Cart.findOne({userId:req.params.userId});
        res.status(200).json(cart);
    }catch(err){
        res.status(500).json(err);
    }
});

router.get("/",verifyTokenAndAdmin,async (req,res)=>{
    try{
        const carts = await Cart.find();
        res.status(200).json(carts);
    }catch(err){
        res.status(500).json(err);
    }
});

router.put("/:id",verifyTokenAndAuthorization,async (req,res)=>{
    try{
        const updatedCart = await Cart.findOneAndUpdate({userId:req.params.id},{$set:req.body});
        res.status(200).json(updatedCart);
    }catch(err){
        res.status(500).json(err);
    }
});

router.delete("/:id",verifyTokenAndAuthorization,async (req,res)=>{
    try{
        await findOneAndDelete({userId:req.params.id});
        res.status(200).json("cart deleted successfully");
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;