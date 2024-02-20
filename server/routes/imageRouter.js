const { Router } = require('express');
const imageRouter = Router();
const Image = require("../models/Image");
const { upload } = require("../utils/imageUpload");
const { default: mongoose } = require('mongoose');
const fs = require("fs");
const { promisify } = require("util");

const fileUnlink = promisify(fs.unlink);

imageRouter.post('/', upload.single("image"), async(req,res) => {
    try {
        if (!req.user) throw new Error("권한이 없습니다.");
        const image = await new Image({
            user: {
                _id: req.user.id,
                name: req.user.name,
                username: req.user.username,
            },
            public: req.body.public,
            key: req.file.filename, 
            originalFileName: req.file.originalname
        }).save()
        res.json(image);
    } catch(err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
});

imageRouter.get("/", async(req, res) => {
    try {
        const images = await Image.find({public: true});
        return res.json(images);
    } catch(err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
});

imageRouter.delete("/:imageId", async(req,res) => {
    try {
        if (!req.user) throw new Error("권한이 없습니다.");
        console.log(req.params.imageId);
        if (!mongoose.isValidObjectId(req.params.imageId)) throw new Error("올바른 이미지 ID가 아닙니다.");
        const image = await Image.findOneAndDelete({ _id: req.params.imageId });
        if (!image) return res.json({ message: "요청하신 이미지는 이미 삭제되었습니다."})
        await fileUnlink(`./uploads/${image.key}`);
        res.json({ message: "이미지가 삭제되었습니다.", image})
    } catch(err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
});

imageRouter.patch("/:imageId/like", async(req,res) => {
    try {
        if (!req.user) throw new Error("권한이 없습니다.");
        if (!mongoose.isValidObjectId(req.params.imageId)) throw new Error("올바른 이미지 ID가 아닙니다.");
        const image = await Image.findOneAndUpdate(
            { _id: req.params.imageId }, 
            { $addToSet: { likes: req.user._id } }, 
            { new: true });
        res.json(image);
    } catch(err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
});

imageRouter.patch("/:imageId/unlike", async(req,res) => {
    try {
        if (!req.user) throw new Error("권한이 없습니다.");
        if (!mongoose.isValidObjectId(req.params.imageId)) throw new Error("올바른 이미지 ID가 아닙니다.");
        const image = await Image.findOneAndUpdate(
            { _id: req.params.imageId }, 
            { $pull: { likes: req.user._id } }, 
            { new: true });
        res.json(image);
    } catch(err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
});

module.exports = { imageRouter };