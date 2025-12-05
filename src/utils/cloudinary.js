import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

 // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_SECRET
    });

    const upload=async (localfilepath)=>{
        try{
            if(!localfilepath){
                console.log("File Path Not Found")
                 return null
                };

               const resp= await cloudinary.uploader.upload(localfilepath,{
                    resource_type:'auto'
                 })

                 console.log("Upload Done");
                 return resp;
        }
        catch(error){
            fs.unlinkSync(localfilepath) //revomes the file from local server 
            console.log("Error occured At Uploading",error);
            return null;
        }
    }