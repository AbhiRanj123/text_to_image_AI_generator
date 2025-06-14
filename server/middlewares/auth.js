import jwt from 'jsonwebtoken';

const userAuth = async (req,res,next) => {
    // console.log(req.headers.token);
    const { token } = req.headers;
    // console.log(token);
    if(!token){
        return res.status(401).json({success:false, message: "Unauthorized....Login again!!!"});
    }

    try{
        const tokenDecode = jwt.verify(token,process.env.JWT_KEY);
        // console.log(tokenDecode.id);
        // console.log(req.body);
        // // Ensure req.body exists
        if (!req.body) {
            req.body = {};
        }

        if (tokenDecode.id) {
            req.body.userId = tokenDecode.id;
        } else {
            return res.status(401).json({ success: false, message: "Unauthorized... Login again!!!" });
        }

        // console.log(req.body.userId);
        next();
    } catch(error){
        console.log(error);
        return res.json({success:false, message: error.message});
    }
}

export default userAuth;