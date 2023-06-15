
const {UserModel} = require("../Model/User.model")
const bcrypt = require('bcrypt');

const express = require("express")

const jwt = require("jsonwebtoken")

const userRouter = express.Router();
require("dotenv").config();

userRouter.post("/register",async(req,res)=>{
    const {username,email,password,avatar} = req.body

    try {
        bcrypt.hash(password,5,async(err,hash)=>{
            const user = await UserModel({username,email,avatar,password:hash})
            await user.save()
            res.status(200).send({msg:"New User Registered Successfuly"})
        })
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    const user = await UserModel.findOne({email})

    try {
        if(user){
            bcrypt.compare(password, user.password, (err,result)=>{
                if(result){
                    var token = jwt.sign({postID:user._id,postBy:user.username},process.env.Secret)
                    res.status(200).send({msg:"Login Successful",token:token})
                }else{
                    res.status(200).send({msg:"Wrong Credientials!!"})
                }
            })
        }else{
            res.status(200).send({msg:"User Not Found"})
        }
    } catch (error) {
        res.status(400).send({msg:error.message})
        return;
    }

})


module.exports = {
    userRouter,
}