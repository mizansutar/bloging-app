const mongoose=require("mongoose");

const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unqiue:true

    },
    description:{
        type:String,
        required:true,
        unqiue:true,

    },
    piture:{
        type:String,
        required:false,

    },
    username:{
        type:String,
        required:true,

    },
    categcategeries:{
        type:String,
        required:true,

    },




},{timestamps:true}
);

const Post= mongoose.model("posts",postSchema);

module.exports= Post;
