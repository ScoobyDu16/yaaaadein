import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import connectDB from './db.js';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';

dotenv.config();
connectDB();

const app= express();
const PORT= process.env.PORT || 4000;

app.use(express.urlencoded({extended: true, limit: '30mb'}));
app.use(express.json({extended: true, limit: '30mb'}));
app.use(cors());
app.use('/', authRoutes);
app.use('/posts', postRoutes);

app.get('/', (req, res)=>{
    res.send('Advanced Memories home page');
})

mongoose.connection.once("open", ()=>{
    app.listen(PORT, ()=>{
        console.log('Connected to Advanced Memories DB');
        console.log(`Advanced Memories server started on port : ${PORT}`);
    })
})