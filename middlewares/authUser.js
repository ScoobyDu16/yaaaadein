import jwt, { decode } from 'jsonwebtoken';

const authUser= async (req, res, next)=>{
    try {
        const token= req.headers.authorization.split(' ')[1];
        if(!token) return res.status(400).send({message: 'User not authorized'});

        const isCustomToken= token.length<500;

        let decodedData;
        if(isCustomToken){
            // decodedData= jwt.verify(token, process.env.JWT_SECRET);
            decodedData= jwt.verify(token, "3519c10a0a7c6259f9fb2a7528a55d909633c124c768ff7868d2a6c3632d62654ee253081d99ec918cbd5dc14d82f3a4466c457630582531a246cde33c103b0b");
            req.user= decodedData?.user;
            req.custom= true;
        } else{
            decodedData= jwt.decode(token);
            req.user= decodedData;
            req.custom= false;
        }
        next();
    } catch (error) {
        console.log('Error : ', error);
    }
}

export default authUser;