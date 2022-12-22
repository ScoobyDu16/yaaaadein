import jwt, { decode } from 'jsonwebtoken';

const authUser= async (req, res, next)=>{
    try {
        const token= req.headers.authorization.split(' ')[1];
        if(!token) return res.status(400).send({message: 'User not authorized'});

        const isCustomToken= token.length<500;

        let decodedData;
        if(isCustomToken){
            decodedData= jwt.verify(token, process.env.JWT_SECRET);
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