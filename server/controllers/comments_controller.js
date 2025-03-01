const { response } = require("express");
const Comment = require("../models/comment");
const newComment = async (req, res) => {
    try {
        console.log(req.body)
    const comment = await new Comment(req.body);
        comment.save();

        res.status(200).json(comment)


    } catch (error) {
        res.status(500).json({msg:"comment not saved ...!"})
    }
}


const getComments=async (req,res) => {
    console.log(req.params)
    try {
        const comment= await Comment.find({postId:req.params.id})
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({msg:"internal error.."});
    }
}
module.exports = { newComment ,getComments};