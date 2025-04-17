const { types, required } = require("joi")
const mongoose = require("mongoose")
const authSchema = new mongoose.Schema({
    userName :{
        type:String,
        required:[true,"UserName berilishi shart!"],
        minLength:[3,"UserName 3 ta belgidan kam bolmasligi kerak"]
    },
    email:{
        type:String,
        required:[false,"Email berilishi shart"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Parol berilishi shart!"]
    },
    role:{
        type:String,
        required:false,
        default:"user",
        enum: ["user","admin","superadmin"]
    },
    otp:{
        type:String,
        required:false,
        default:0
    },
    isVerified:{
        type:Boolean,
        required:false,
        default:false
    },
    lastTime:{
        type:Date,
        required:false,
        default:0
    }
} ,{ versionKey: false ,timestamps: true })
const authModels = mongoose.model("auth", authSchema)
module.exports = authModels