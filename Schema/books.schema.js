// const { string } = require("joi")
// const mongoose = require("mongoose")
// const currentYear = new Date().getFullYear()
// const booksSchema = new mongoose.Schema({

//     title:{
//         type: String,
//         required:[true,"Kitob nomi berilishi shart !"],
//         minLength:[2,"Kitob nimo 2 belgidan  kam bolmasligi kerak!"],
//         maxleenght:[100,"Kitob nimo 100 belgidan  kam bolmasligi kerak!"]
        
//     },
//     pages:{
//         type: Number,
//         required:[true,"Kitob varoqlari berilishi shart !"],
//         min:[20,"Kitob varoqlari 20 dan kam bolmasligi kerak"],
//         max:[1000,"Kitob varoqlari 1000 dan kam bolmasligi kerak"]
//     },
//     year:{
//         type:Number,
//         required:[true,"Kitob yilini kiritish shart!"],
//         validate:{
//             validator:function(value){
//                 return value <= currentYear
//             },
//             message:`Kitob chop etilgan yil kopi bilan ${currentYear} bolishi kerak.`
//         }
//     },
//     price:{
//         type:Number,
//         required:[true,"Kitob narxini kitritish shart!"]
//     },
//     country :{
//         type:String,
//         required:[true,"Mamlakatni kiritish shart!"]
//     },
//     author:{
//         type : String,
//         ref:"authors",
//         required:[true,"Muallifni kiritish shart!"]
//     },
//     discription:{
//         type:String,
//         required:[true]
//     },
//     bookImg:{
//         type:String,
//         default : null
    
//     }
// }, { versionKey: false,timestamps: true })
// const booksModels = mongoose.model("books", booksSchema)
// module.exports = booksModels
const mongoose = require("mongoose");
const currentYear = new Date().getFullYear();

const booksSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Kitob nomi berilishi shart!"],
      minLength: [2, "Kitob nomi 2 belgidan kam bo‘lmasligi kerak!"],
      maxLength: [100, "Kitob nomi 100 belgidan oshmasligi kerak!"],
    },
    pages: {
      type: Number,
      required: [true, "Kitob varaqlari berilishi shart!"],
      min: [20, "Kitob varaqlari 20 dan kam bo‘lmasligi kerak"],
      max: [1000, "Kitob varaqlari 1000 dan oshmasligi kerak"],
    },
    year: {
      type: Number,
      required: [true, "Kitob yilini kiritish shart!"],
      validate: {
        validator: function (value) {
          return value <= currentYear;
        },
        message: `Kitob chop etilgan yil ko‘pi bilan ${currentYear} bo‘lishi kerak.`,
      },
    },
    price: {
      type: Number,
      required: [true, "Kitob narxini kiritish shart!"],
    },
    country: {
      type: String,
      required: [true, "Mamlakatni kiritish shart!"],
    },
    author: {
      type: String,
      ref: "authors",
      required: [true, "Muallifni kiritish shart!"],
    },
    discription: {
      type: String,
      required: [true, "Kitob tavsifi berilishi shart!"],
    },
    bookImg: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const booksModels = mongoose.model("books", booksSchema);
module.exports = booksModels;