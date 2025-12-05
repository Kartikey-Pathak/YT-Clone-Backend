import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app=express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
}))
app.use(express.json({limit:"20kb"}));  //data will and can come in json format with this limit size
app.use(express.urlencoded({limit:"20kb"}));
app.use(express.static("public"));
app.use(cookieParser());

//Routes import
import userRouter from "./routes/user.routes.js"

//routes declared
app.use("/api/users",userRouter);
//http://localhost:8000/api/users/register


export {app};