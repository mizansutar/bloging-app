const express = require('express');
const {Get_all_posts,getPost,UpdatePost}=require("../controllers/get_allPost.js");
// Ensure the field name matches the frontend ("file")
const Postrouter = express.Router();

Postrouter.get('/posts',Get_all_posts );
Postrouter.get("/post/:id",getPost);
module.exports = Postrouter;
