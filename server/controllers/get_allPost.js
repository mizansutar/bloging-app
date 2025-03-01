const Post = require("../models/post_model.js")

const Get_all_posts = async (req, res) => {
    const category = req.query.category;
    const filter = category ? { categcategeries: category } : {};
    console.log("filter", filter);
    try {
        const posts = await Post.find(filter);
        return res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ msg: "Internal server error" });
    }
};

const getPost = async (req, res) => {
    console.log(req.params.id)
    try {
        const post = await Post.findById(req.params.id);

        return res.status(200).json(post);
    } catch (error) {
        console.log("error is ", error);
    }
}

const UpdatePost = async (req, res) => {
    console.log("from update ", req.params.id);
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }
        await Post.findByIdAndUpdate(req.params.id, { $set: req.body }); // Corrected line
        return res.status(200).json({ msg: "Post updated successfully" });
    } catch (error) {
        console.log("error is ", error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

module.exports = { Get_all_posts, getPost, UpdatePost };