import mongoose from "mongoose";

const connectDB= async ()=>{
    try {
        // mongoose.connect(process.env.MONGO_URI, ()=>{});
        mongoose.connect("mongodb+srv://amarsandhu:mongodb123@cluster0.tjv5fuu.mongodb.net/advanced-memories?retryWrites=true&w=majority", ()=>{});
    } catch (error) {
        console.log(error);
        console.log('Unable to connect to Advanced Memories DB');
        console.log('Unable to start Advanced Memories Server');
    }
}

export default connectDB;