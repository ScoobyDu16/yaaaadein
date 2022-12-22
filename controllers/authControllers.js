import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../models/User.js';

export const signup= async (req, res)=>{
    const {given_name, family_name, username, email, password, cPassword}= req.body;
    try {
        const existingUser= await User.findOne({email});
        if(existingUser) return res.status(400).send({message: 'User already exists'});
        if(password!==cPassword) return res.status(400).send({messaage: "Passwords don't match"});

        const hashedPassword= await bcrypt.hash(password, 10);
        const newUser= new User({
            given_name,
            family_name,
            username,
            email,
            password: hashedPassword
        })
        await newUser.save();
        const user= await User.findById(newUser._id).select('-password');
        const data= { user }
        const authToken= jwt.sign(data, process.env.JWT_SECRET, {expiresIn: '1h'});
        console.log('User Signed Up');
        res.send({user, token: authToken});
    } catch (error) {
        console.log(error);
    }
}

export const login= async (req, res)=>{
    const {email, password}= req.body;
    try {
        let user= await User.findOne({email});
        if(!user){
            return res.status(400).send("User don't exist");
        }
        
        const passwordMatch= await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            return res.send('Invalid password');
        }
        user= await User.findOne({email}).select('-password');
        const data= { user };
        const authToken= jwt.sign(data, process.env.JWT_SECRET, {expiresIn: '1h'});
        console.log('User Logged In');
        res.send({user, token: authToken});
    } catch (error) {
        console.log(error);
    }
}