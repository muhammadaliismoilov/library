const { number } = require("joi")
const mongoose = require("mongoose")
const currentYear = new Date().getFullYear()
const membersSchema = new mongoose.Schema({
    fullName :{
        type:String,
        required:[true,"A`zo ismi berilishi shart!"],
        minLength:[3,"A`zo ismi 3 ta belgidan kam bolmasligi kerak"]
    },
    dateOfBirth:{
        type:Date,
        required:[true,"A`zo tugilgan sana berilishi shart"]
    },
    address:{
        type:String,
        required:[true,"Mamlakat kiritilishi shart!"]
    },
    bio:{
        type:String,
        required:[true,"A`zo tavsifi berilishi shart!"],
        maxLength:[1000,"Tavsif 1000 ta belgidan oshmasligi kerak!"]
    },
    readBookCount:{
        type:Number,
        required:[false],
        
    },
    memberImg:{
        type:String,
        default : null
    
    }
} ,{ versionKey: false ,timestamps: true })
const membersModels = mongoose.model("members",membersSchema)
module.exports = membersModels