import mongoose from "mongoose";

const connectDB= async ()=>{
    try {
        mongoose.connect(process.env.MONGO_URI, ()=>{});
    } catch (error) {
        console.log(error);
        console.log('Unable to connect to Advanced Memories DB');
        console.log('Unable to start Advanced Memories Server');
    }
}

export default connectDB;