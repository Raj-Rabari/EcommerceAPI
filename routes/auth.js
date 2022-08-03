const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

router.post('/register',async (req,res)=>{
    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SECRET_KEY).toString(),
    });

    try{
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }catch(err){
        res.status(500).json(err);
    }

});

router.post('/login',async (req,res)=>{
    try{
        const user = await User.findOne({username:req.body.username});
        if(user){
            const encrypted = CryptoJS.AES.decrypt(user.password,process.env.PASS_SECRET_KEY);
            const plainPassword = encrypted.toString(CryptoJS.enc.Utf8);
            if(req.body.password!==plainPassword){
                res.status(401).json("Wrong credentials");
            }
            else{
                const accessToken = jwt.sign({
                    id:user._id,
                    isAdmin:user.isAdmin
                },
                process.env.JWT_KEY,
                {expiresIn:"3d"});

                const {password,...others} = user._doc;


                res.status(200).json({...others,accessToken});
            }
        }
        else{
            res.status(401).json("wrong credentials");
        }
    }catch(err){
        res.status(401).json(err);
    }
});

module.exports = router;