require("dotenv").config();

const express = require('express');
const multer = require('multer');
const { v4: uuid } = require('uuid');
const mime = require('mime-types');
const mongoose = require('mongoose');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "./uploads"),
    filename: (req, file, cb) => cb(null, `${uuid()}.${mime.extension(file.mimetype)}`),
})
const upload = multer({
    storage, 
    fileFilter: (req, file, cb) => {
        if (['image/jpeg','image/jpg','image/png'].includes(file.mimetype)) cb(null, true)
        else cb(new Error('Invalid file type'), false);
    },
    limits: {
        fileSize: 5* 1024 * 1024
    }
});

const app = express();
const PORT = 4000;

mongoose.connect(
    process.env.MONGODB_URI,
)
.then(() => {
    console.log("MongoDB connected") 
    
    app.use("/uploads",express.static("uploads"));
    app.post('/upload', upload.single("image"), (req,res) => {
        console.log(req.file);
        res.json(req.file);
    })
    app.listen(PORT, () => console.log("Express server liseting on PORT " + PORT));  
})
.catch((err)=>console.log(err));
