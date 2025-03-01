const { GridFsStorage } = require("multer-gridfs-storage");
const multer = require("multer");

const storage = new GridFsStorage({
    url: "mongodb://127.0.0.1:27017/blog",
    
    file: (req, file) => {
        const match = ["image/png", "image/jpg"];
        if (match.indexOf(file.mimetype) === -1) {
            return `${Date.now()}-blog${file.originalname}`;
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog${file.originalname}`
        };
    }
});



module.exports =multer({ storage });