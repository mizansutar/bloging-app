const express = require("express");
const { signup, Login,createPost } = require("../controllers/user_control.js");
//const { uploadImage } = require("../controllers/imageController.js");
//const upload = require("../utils/upload.js");
const {create_Post}=require("../controllers/post_controller.js");
const { authToken } = require("../controllers/jwt._controller.js");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", Login);

router.post("/create",create_Post);


module.exports = router;