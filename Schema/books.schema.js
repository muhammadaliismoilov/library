const { string } = require("joi")
const mongoose = require("mongoose")
const currentYear = new Date().getFullYear()
const booksSchema = new mongoose.Schema({

    title:{
        type: String,
        required:[true,"Kitob nomi berilishi shart !"],
        minLength:[2,"Kitob nimo 2 belgidan  kam bolmasligi kerak!"],
        maxleenght:[100,"Kitob nimo 100 belgidan  kam bolmasligi kerak!"]
        
    },
    pages:{
        type: Number,
        required:[true,"Kitob varoqlari berilishi shart !"],
        min:[20,"Kitob varoqlari 20 dan kam bolmasligi kerak"],
        max:[1000,"Kitob varoqlari 1000 dan kam bolmasligi kerak"]
    },
    year:{
        type:Number,
        required:[true,"Kitob yilini kiritish shart!"],
        validate:{
            validator:function(value){
                return value <= currentYear
            },
            message:`Kitob chop etilgan yil kopi bilan ${currentYear} bolishi kerak.`
        }
    },
    price:{
        type:Number,
        required:[true,"Kitob narxini kitritish shart!"]
    },
    country :{
        type:String,
        required:[true,"Mamlakatni kiritish shart!"]
    },
    author:{
        type : mongoose.Types.ObjectId,
        ref:"authors",
        required:[true,"Muallifni kiritish shart!"]
    },
    discription:{
        type:String,
        required:[true]
    },
    bookImg:{
        type:String,
        default : null
    
    }
}, { versionKey: false })
const booksModels = mongoose.model("books", booksSchema)
module.exports = booksModels