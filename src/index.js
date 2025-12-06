import dotenv from 'dotenv'
import connectdb from "./db/index.js";
import { app } from './app.js';

dotenv.config({path:"./.env"})

connectdb()
.then(()=>{
    app.listen(process.env.PORT||8000);
    

})
.catch((error)=>{
    console.error("Error At DB Connection ,",error);

})