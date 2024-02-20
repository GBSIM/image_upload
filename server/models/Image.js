const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    user: {
        _id: { type: mongoose.Types.ObjectId, required: true, index: true },
        name: { type: String, required: true },
        username: { type: String, required: true},
    },
    public: { type: Boolean, required: true, default: false },
    key: { type: String, require: true },
    originalFileName: { type: String, require: true },
    likes: [{ type: mongoose.Types.ObjectId }],
}, { timestamps: true });

module.exports = mongoose.model( "Image", ImageSchema );