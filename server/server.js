require("dotenv").config();

const express = require('express');

const mongoose = require('mongoose');
const { imageRouter } = require("./routes/imageRouter");
const { userRouter } = require("./routes/userRouter");

const app = express();
const { MONGODB_URI, PORT } = process.env;

mongoose.connect(
    MONGODB_URI,
)
.then(() => {
    console.log("MongoDB connected") 
    app.use("/uploads",express.static("uploads"));
    app.use(express.json());
    app.use("/images", imageRouter);
    app.use("/users",userRouter);
    app.listen(PORT, () => console.log("Express server liseting on PORT " + PORT));  
})
.catch((err)=>console.log(err));
