const mongoose = require("mongoose")
const currentYear = new Date().getFullYear()
const authorSchema = new mongoose.Schema({
    fullName :{
        type:String,
        required:[true,"Muallif ismi berilishi shart!"],
        minLength:[3,"Muallif ismi 3 ta belgidan kam bolmasligi kerak"]
    },
    dateOfBrith:{
        type:Date,
        required:[false,"Muallif tugilgan sana berilishi shart"]
    },
    dateOfDeath:{
        type:Date,
        required:false,
    },
    country:{
        type:String,
        required:[true,"Mamlakat kiritilishi shart!"]
    },
    bio:{
        type:String,
        required:[true,"Muallif tavsifi berilishi shart!"],
        maxLength:[1000,"Tavsif 1000 ta belgidan oshmasligi kerak!"]
    },
    authorImg:{
        type:String,
        default : null
    
    }
} ,{ versionKey: false ,timestamps: true })
const authorModels = mongoose.model("authors", authorSchema)
module.exports = authorModels