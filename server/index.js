// filepath: /C:/Users/ASUS TUF/Desktop/blogging  app/server/index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");
const { connectDB } = require('./config/db');
const userRouter = require('./routes/user_routes.js');
const imageRouter = require('./routes/Image_router.js');
const postsRoute = require('./routes/posts_routes.js');
const multer = require("multer");
const updRoute = require("./routes/upd_router.js");
const deleteRoute = require("./routes/delete_routes.js");
const commentsRoute = require('./routes/comments_routes.js');


const app = express();
const port = 3001;


//const storage=multer.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`)
    },
})
const upload = multer({ storage });




// Middleware
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/", userRouter);
app.use(imageRouter);
app.use("/all", postsRoute);
app.use("/update", updRoute);
app.use("/delete", deleteRoute);
app.use("/new", commentsRoute);


// Use imageRouter for file routes
// Connect to database
connectDB();

app.listen(port, () => console.log(`Example app listening on port ${port}!`));