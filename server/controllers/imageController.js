import userModel from "../models/userModel.js";
import FormData from "form-data";
import axios from "axios";

export const generateImage = async(req,res) => {
    try{
        const { userId,prompt } = req.body;
        console.log("User ID:", userId);
        console.log("Prompt:", prompt);
        const user = await userModel.findById(userId);
        if(!user || !prompt){
            return res.json({success:false, message: "Missing details"});
        }

        if(user.creditBalance === 0 || userModel.creditBalance < 0){
            return res.json({success:false, message: "Insufficient credits", creditBalance: user.creditBalance});
        }

        const formData = new FormData();
        formData.append('prompt', prompt);

        const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1',formData, {
            headers: {
                'x-api-key': process.env.API_KEY,
            },
            responseType: 'arraybuffer'
        });
        console.log("Image data received from API",data);
        const base64Image = Buffer.from(data, 'binary').toString('base64');
        const imageUrl = `data:image/png;base64,${base64Image}`;
        await userModel.findByIdAndUpdate(user._id,{
           creditBalance: user.creditBalance - 1,
        });

        res.json({
            success: true,
            message: "Image generated successfully",
            creditBalance : user.creditBalance - 1,
            imageUrl
        })
    }
    catch(error){
        console.log(error);
        res.json({success:false, message: error.message});
    }
}