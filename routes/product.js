const router = require("express").Router();
const Product = require("../models/Product");
const { verifyTokenAndAdmin } = require("./verifyToken");

router.post("/",verifyTokenAndAdmin,async (req,res)=>{
    const product = new Product(req.body);

    try{
        const newProduct = await product.save();
        if(newProduct)
            res.status(200).json(newProduct);
        else
            res.status(401).json("product is not added");
    }catch(err){
        res.status(500).json(err);
    }
});

router.put("/update/:id",verifyTokenAndAdmin,async (req,res)=>{
    const product = await Product.findOne({_id:req.params.id});
    if(product){
        try{
            const updatedProd = await Product.findOneAndUpdate({_id:req.params.id},{$set:req.body},{new:true});
            res.status(200).json(updatedProd);
        }catch(err){
            res.status(401).json(err);
        }
    }else{
        res.status(500).json("product not found");
    }
});

router.get("/find/:id",async (req,res)=>{
    try{
        const product = await Product.find({_id:req.params.id});
        res.status(200).json(product);
    }catch(err){
        res.status(500).json(err);
    }
});

router.get("/find",async (req,res)=>{
    const qNew = req.query.new;
    const qCategory = req.query.category;
    console.log(qCategory);
    try{
        let products;
        if(qNew)
            products = await Product.find().sort({createdAt:-1}).limit(5);
        else if(qCategory)
            products = await Product.find({categories:{$in:[qCategory]}});
        else
            products = await Product.find();
        res.status(200).json(products);
    }catch(err){
        res.status(500).json(err);
    }
});

router.delete("/remove/:id",verifyTokenAndAdmin,async (req,res)=>{
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json(product);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;