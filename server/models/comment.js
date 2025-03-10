const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    postId: {
        type: String,
        required: true,
        unqiue: true,

    },
    date: {
        type: Date,
        required: true,

    },
    comments: {
        type: String,
        required: true,
    },
}, { timestamps: true }
);

const Comment = mongoose.model("comments", commentSchema);

module.exports = Comment;
