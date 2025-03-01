const Post = require("../models/post_model")

const create_Post=async (req,res)=>{
 try {
    console.log(req.body);
    const post=  await new Post(req.body);
    console.log(post);
    post.save();

    return res.status(200).json({message:"post saved successfully...!"});

 } catch (error) {
    return res.status(200).json(error);
 }



}
module.exports={create_Post}