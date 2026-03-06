import express from "express";
import dotenv from "dotenv";
import userRouter from './routes/userRoutes.js';
import db from "./config/db.js";
import mailRouter from './routes/mailRoutes.js';
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
db();

app.use('/user', userRouter);
app.use('/mail', mailRouter);

app.get('/',(req,res)=>{
    res.send("<h1>Hello from backend</h1>")
})

app.listen(process.env.PORT, ()=>{
    console.log("Server is running on port:",process.env.PORT)
})