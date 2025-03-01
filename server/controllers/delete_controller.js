const Post = require("../models/post_model.js");
const Comment = require("../models/comment.js");
const { default: mongoose } = require("mongoose");
const deletePost = async (req, res) => {
    try {
        console.log(req.params);
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: "Post not found...!" });
        }
        console.log(req.params.id);
        const comment = await Comment.find({ postId: req.params.id });
        console.log(comment);
        if (comment) {
            Comment.deleteMany({ postId: req.params.id });
            
        }


        await post.deleteOne(); // Corrected method to deleteOne
        return res.status(200).json({ msg: "Post deleted successfully...!" });

    } catch (error) {
        console.log("error is ", error);
        res.status(500).json({ msg: "Internal server error" });
    }
};
module.exports = { deletePost }; // Corrected export