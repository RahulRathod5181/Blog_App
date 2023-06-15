
const {BlogModel} = require("../Model/Blog.model")
const express = require("express")
var jwt = require("jsonwebtoken")
require("dotenv").config();

const blogRouter = express.Router();

blogRouter.post("/blogs",(req,res)=>{
    console.log(req.body)
    try {
        const blog = new BlogModel(req.body)
         blog.save();
        res.status(200).send({msg:`New Blog has been Added by ${req.body.username}`})
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})

blogRouter.get("/blogs",async(req,res)=>{
    const {page,limit,category,sort,order} = req.query
    // console.log(req.query)
    if(page && limit){
        let skip = (+page-1)*limit
        const blog = await BlogModel.find().skip(skip).limit(limit)
        res.send(blog)
    }else if(req.query && !sort && !order){
        let skip = (+page-1)*5
        delete req.query.page
        delete req.query.limit
        console.log(req.query)
        const blog = await BlogModel.find(req.query).skip(skip).limit(5)
        res.send(blog)
    }else if(sort && order){
        console.log("hello")
        if(order=="asc"){
            let skip = (+page-1)*5
            const blog = await BlogModel.find().sort({date:1}).skip(skip).limit(5)
            res.send(blog)
        }else{
            let skip = (+page-1)*5
            const blog = await BlogModel.find().sort({date:-1}).skip(skip).limit(5)
            res.send(blog)
        }
    } 
})

blogRouter.patch("/blogs/:id/like",async(req,res)=>{
    const {id} = req.params
    const blog = await BlogModel.findOne({_id:id})
    console.log(blog)
    let newLike = (blog[0].likes)+1
    blog[0].likes = newLike
    let body = blog[0]
    console.log(body)
    try {
        await BlogModel.findByIdAndUpdate({_id:id},body)
        res.status(200).send({msg:"Likes updated"})
    } catch (error) {
        res.status(400).send({msg:error.message})
        return
    }
    res.send(id)
})

blogRouter.patch("/blogs/:id",async(req,res)=>{
    const {id} = req.params;
    const blog = await BlogModel.findOne({_id:id})
    try {
        if(req.body.blogID!=blog.blogID){
            res.status(200).send({msg:"You cannot Edit Others Blog"})
        }else{
            await BlogModel.findByIdAndUpdate({_id:id},req.body)
            res.status(200).send({msg:"Blog is updated"})
        }
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})

blogRouter.delete("/blogs/:id",async(req,res)=>{
    const {id} = req.params;

    const blog = await BlogModel.findOne({_id:id})
    try {
        if(req.body.blogID!=blog.blogID){
            res.status(200).send({msg:"You cannot Delete Others Blog"})
        }else{
            await BlogModel.findByIdAndDelete({_id:id})
            res.status(200).send({msg:"Blog is Deleted"})
        }
    } catch (error) {
        
    }
})

module.exports = {
    blogRouter
}

