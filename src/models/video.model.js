import mongoose, { Mongoose, Schema, trusted } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoschema=Schema({
    videoFile:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    des:{
        type:String,
        required:true
    },
    duration:{
        type:Number, //from cloudinary obviously
        required:true
    },
    views:{
        type:Number,
        default:0
    },
    isPublished:{
        type:Boolean,
        default:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:User
    }
},{timespams:true})

videoschema.plugin(mongooseAggregatePaginate);

export const Video=mongoose.model("Video",videoschema);