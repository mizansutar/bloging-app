const mongoose=require("mongoose");

const tokenSchema=new mongoose.Schema({
    Token:{
        type:String,
        required:true,

    }}
);

const token= mongoose.model("Token",tokenSchema);

module.exports= token;
