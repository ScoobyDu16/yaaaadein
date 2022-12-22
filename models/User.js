import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    given_name: {
        type: String,
        required: true
    },
    family_name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const userModel= mongoose.model('user', userSchema);

export default userModel;