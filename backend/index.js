import express, { urlencoded } from "express"
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from "cors";
import router from "./Routes/userRoutes.js";


const app= express()

dotenv.config();
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/api/v1',router);

mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("DB connected successfully."))
.catch((err)=>console.log("DB error =>",err))


app.listen(process.env.PORT)