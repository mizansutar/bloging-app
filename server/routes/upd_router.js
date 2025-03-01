const express = require('express');
const { UpdatePost } = require("../controllers/get_allPost.js");
const updrouter = express.Router();

updrouter.put("/:id", UpdatePost); // Corrected route
module.exports = updrouter;
