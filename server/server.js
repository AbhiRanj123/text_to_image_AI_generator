import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoute.js'

const PORT = process.env.PORT || 3000

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
await connectDB();

app.use('/api/user', userRouter);
app.get('/',(req,res)=>{
    res.send('Hello from the server')
});

app.listen(PORT, () => {
    console.log(`🚀🚀🚀 Server is running on port ${PORT}`)
});