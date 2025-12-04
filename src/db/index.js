import mongoose from "mongoose";
import { dbname } from "../constant.js";

async function connectdb(){
    try{
       const connection= await mongoose.connect(`${process.env.MONGODB_URI}/${dbname}`);
       console.log(`Mongodb Connectd...  ${connection}`)

    }catch(error){
        console.error("Error",error);
    }

}

export default connectdb;