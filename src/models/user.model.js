import mongoose, { Mongoose, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userschema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullname: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String,
        required: true
    },
    coverimage: {
        type: String,
    },
    watchhistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: ['true', "password is required"]
    },
    refreshToken: {
        type: String
    }
}, { timestamps })

userschema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password, 10);
    next();
})

userschema.methods.isPasswordCorrect = async function (password) {
    return bcrypt.compare(password, this.password);  //this.password refers to the database (hashed one)
}
userschema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this.id,
            user: this.username,
            email:this.email
        },
        process.env.ACCESS_TOKEN_SECRET,  //A short-lived token that proves the user is logged in.
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userschema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this.id,
        },
        process.env.REFRESH_TOKEN_SECRET,  //A long-lived token used to generate a new access token.
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userschema);