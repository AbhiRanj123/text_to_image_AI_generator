// Load .env first
import dotenv from "dotenv";
dotenv.config();

import userModel from "../models/userModel.js";
import transactionModel from "../models/transactionModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import razorpay from "razorpay";

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
        // console.log(req.body);

        const { userId } = req.body;
        // console.log(userId);
        
        const user = await userModel.findById(userId);
        return res.json({success:true, credits: user.creditBalance, user:{name:user.name}});
    }
    catch(error){
        console.log(error);
        res.json({success:false, message: error.message});
    }
}

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

const paymentRazorpay = async(req,res) =>{
    try{
        console.log(req.body);
        const { userId, planId } = req.body;
        const userData = await userModel.findById(userId);
        if(!userId || !planId){
            return res.json({success:false, message: "Please provide userId and planId"});
        }
        let credits,plan,amount,date;
        switch(planId){
            case 'Basic':
                plan = 'Basic'
                credits = 100
                amount = 10
                break;
            case 'Advanced':
                plan = 'Advanced'
                credits = 500
                amount = 50
                break;
            case 'Business':
                plan = 'Business'
                credits = 5000
                amount = 250
                break;
            default:
                return res.json({success:false, message: "Invalid planId"});
        }
        date = Date.now();

        const transactionData = {
            userId,
            plan,
            amount,
            credits,
            date
        };

        const newTransaction = await transactionModel.create(transactionData);
        const options = {
            amount: amount * 100, // Amount in paise
            currency: process.env.CURRENCY,
            receipt: newTransaction._id,
        };

        await razorpayInstance.orders.create(options, (error, order)=>{
            if(error){
                console.log(error);
                return res.json({success:false, message: error.message});
            }
            res.json({success:true, order});
        })
    }
    catch(error){
        res.json({success:false, message: error.message});
    }
}

const verifyRazorpayPayment = async (req, res) => {
    try{
        const { razorpay_order_id } = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

        if(orderInfo.status == 'paid'){
            // Update the transaction status to paid
            const transactionData = await transactionModel.findById(orderInfo.receipt);
            if(transactionData.payment){
                return res.json({success:false, message: "Payment failed"});
            }

            const userData = await userModel.findById(transactionData.userId);
            const creditBalance = userData.creditBalance + transactionData.credits;
            await userModel.findByIdAndUpdate(userData._id, {creditBalance});
            await transactionModel.findByIdAndUpdate(transactionData._id, {payment: true});
            res.json({success:true, message: "Payment successful"});
        }
        else{
            res.json({success:false, message: "Payment failed"});
        }
    }
    catch(error){
        console.log(error);
        res.json({success:false, message: error.message});
    }
}

export { registerUser, loginUser, userCredits, paymentRazorpay, verifyRazorpayPayment };