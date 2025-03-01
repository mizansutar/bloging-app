const express = require('express');
const { deletePost } = require("../controllers/delete_controller.js"); // Corrected import
const deleteRoute = express.Router();

deleteRoute.delete("/:id", deletePost); // Corrected route
module.exports = deleteRoute;
