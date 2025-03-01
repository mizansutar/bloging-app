const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

const mongoURI = "mongodb://localhost:27017/blog"; // Define mongoURI

let gfs;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            //  useCreateIndex:true,
            useUnifiedTopology: true
        });

        console.log('MongoDB connected successfully');

        // Init gfs
    } catch (error) {
        console.log(error);
    }
};



module.exports = { connectDB, mongoURI }; // Export mongoURI