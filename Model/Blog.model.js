const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
    username:{type:String,require:true},
    blogID:{type:String,require:true},
    title:{type:String,require:true},
    content:{type:String,require:true},
    category:{type:String,require:true},
    date:{type:String,require:true},
    likes:{type:Number,require:true},
    comments:[]
},{
    versionKey:false
})

const BlogModel = mongoose.model("blog",blogSchema)

module.exports={
    BlogModel
}