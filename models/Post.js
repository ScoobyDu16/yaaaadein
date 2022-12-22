import mongoose from "mongoose";

const postSchema= new mongoose.Schema({
    title: String,
    description: String,
    creatorId: String,
    creatorName: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const postModel= mongoose.model('post', postSchema);

export default postModel;