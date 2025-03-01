const express = require("express");
const { newComment ,getComments} = require("../controllers/comments_controller");


const commentsRoute = express.Router();

commentsRoute.post("/comment/:id",newComment );

commentsRoute.get("/allcomments/:id",getComments );

module.exports = commentsRoute;