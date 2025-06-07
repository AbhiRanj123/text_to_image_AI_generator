import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const registerUser = async (req,res) => {
    try{
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.json({success:false, message: "Please fill the missing details!!!"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData);
        const user = await newUser.save();

        // Generate JWT token for response
        const token = jwt.sign({id: user._id},process.env.JWT_KEY);
        res.json({success:true, message: "User registered successfully", token, user: {name: user.name}});
    }
    catch(error){
        console.log(error);
        res.json({success:false, message: error.message});
    }
}

const loginUser = async (req,res) => {
    try{
        const { email, password } = req.body;
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false, message: "User not found"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(isPasswordValid){
            // Generate JWT token for response
            const token = jwt.sign({id: user._id},process.env.JWT_KEY);
            res.json({success:true, message: "User logged in successfully", token, user: {name: user.name}});
        }
        else{
            res.json({success:false, message: "Invalid credentials"});
        }
    }
    catch(error){
        console.log(error);
        res.json({success:false, message: error.message});
    }
}

const userCredits = async (req,res) => {
    try{
        const {userId} = req.body;
        
        const user = await userModel.findById(userId);
        return res.json({success:true, Credits_Available: user.creditBalance, user:{name:user.name}});
    }
    catch(error){
        console.log(error);
        res.json({success:false, message: error.message});
    }
}

export { registerUser, loginUser, userCredits };