import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoute.js'
import imageRouter from './routes/imageRoutes.js'

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());
await connectDB();

app.use('/api/user', userRouter);
app.use('/api/image',imageRouter);
app.get('/',(req,res)=>{
    res.send('Hello from the server')
});

app.listen(PORT, () => {
    console.log(`🚀🚀🚀 Server is running on port ${PORT}`)
});