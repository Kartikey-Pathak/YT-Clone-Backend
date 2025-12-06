import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv'
import fs from "fs";
dotenv.config({path:"./.env"})


 // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    const uploadCloud=async (localfilepath)=>{
        try{
            if(!localfilepath){
                console.log("File Path Not Found")
                 return null
                };

               const resp= await cloudinary.uploader.upload(localfilepath,{
                    resource_type:'auto'
                 })

                //  console.log("Upload Done");
                 fs.unlinkSync(localfilepath);

                 return resp;
        }
        catch(error){
            fs.unlinkSync(localfilepath); //revomes the file from local server 
            console.log("Error occured At Uploading",error);
            return null;
        }
    }
    
    export {uploadCloud};