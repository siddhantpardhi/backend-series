import mongoose, { Schema } from "mongoose";
import bcrypt from "brcypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            trim: true
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String, // Cloudinery url
            required: true 
        },
        coverImage: {
            type: String, // Cloudinery url 
        },
        watchHistory: [{
            type: Schema.types.ObjectId,
            ref: "Video"
        }],
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        refreshToken: {
            type: String 
        }   
    }, 
    {
        timestamps: true
    })

    userSchema.pre("save", async function (next) {

        if(!this.modified("password")) return next();
        this.password = await bcrypt.hash(this.password, 10)
        next()
    })

    userSchema.methods.isPasswordCorrect = async function(password) {
        return await bcrypt.compare(password, this.password)
    }

    export const User = mongoose.model("User", userSchema)