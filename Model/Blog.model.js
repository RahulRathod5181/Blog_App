const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
    title:{type:String,require:true},
    content:{type:String,require:true},
    category:{type:String,require:true},
    date:{type:Number,require:true},
    likes:{type:Number,require:true},
    comments:[{type:Object}]
})

const BlogModel = mongoose.model("blog",blogSchema)

module.exports={
    BlogModel
}