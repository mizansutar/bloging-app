const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    username:{
        type:String,
        required:true,
        unqiue:true,

    },
    HashPassword:{
        type:String,
        required:true,

    },
},{timestamps:true}
);

const User= mongoose.model("users",userSchema);

module.exports= User;
