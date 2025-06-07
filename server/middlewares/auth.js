import jwt from 'jsonwebtoken';

const userAuth = async (req,res,next) => {
    const { token } = req.headers;
    if(!token){
        return res.status(401).json({success:false, message: "Unauthorized....Login again!!!"});
    }

    try{
        const tokenDecode = jwt.verify(token,process.env.JWT_KEY);
        if(tokenDecode.id){
            req.body.userId = tokenDecode.id;
        }
        else{
            return res.status(401).json({success:false, message: "Unauthorized....Login again!!!"});
        }
        next();
    }
    catch(error){
        console.log(error);
        return res.json({success:false, message: error.message});
    }
}

export default userAuth;