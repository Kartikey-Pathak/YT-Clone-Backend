import { AsyncWrapper } from "../utils/AsyncWrapper.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadCloud } from "../utils/cloudinary.js";


const registeruser=AsyncWrapper(async (req,resp)=>{
   const {username,fullname,email,password}= req.body
   //Some Validations
   //some method is for  if at least one element.....
   if([username,fullname,email,password].some((field)=> field?.trim()==="")){
        throw new ApiError(401,"All Fields Are Required");
   }
    
   const exist= await User.findOne({
    $or:[{username},{email}]
   })
   if(exist){
    throw new ApiError(408,"User Already Exists");
   }
    //multer gives this .files access
   const avatarlocalpath=req.files?.avatar?.[0]?.path;
   const coverImagelocalpath=req.files?.coverImage?.[0]?.path;

   if(!avatarlocalpath){
    throw new ApiError(401,"Avatar Is Required");
   }

   const avatar=await uploadCloud(avatarlocalpath);
   const coverimg=await uploadCloud(coverImagelocalpath);

   if(!avatar){
    throw new ApiError(401,"Avatar Is Required");
   }

  const user= await User.create({
    fullname,
    avatar:avatar.url,
    coverImage:coverimg?.url||"",
    email,
    username:username.toLowerCase(),
    password
   })

   const createduser=await User.findById(user._id).select("-password -refreshToken");

   if(!createduser){
    throw new ApiError(500,"Something Wrong While Registering User");
   }


   resp.status(201).json(
    new ApiResponse(201,createduser,"User Created")
   )

})

export {registeruser};