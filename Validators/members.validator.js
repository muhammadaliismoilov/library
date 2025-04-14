// const Joi = require("joi");
// const currentYear = new Date().getFullYear;
// const membersValidation = (data) => {
//   try {
//     const membersValidate = Joi.object({
//       fullName: Joi.string().min(2).max(40).required().message({
//         "string.base": "A`zo ismi stringda kiritilishi shart!",
//         "string.empty": "A`zo ismi bosh bolmasligi kerak",
//         "any.required": "A`zo ismi talab qilinadi va kiritilishi lozim!",
//         "string.min":
//           "A`zo ismi kamida  2 ta belgidan iborat bolishi kerak!",
//         "string.max": "A`zo ismi 40 ta belgidan iborak bolishi kerak!",
//       }),
//       dateOfBrith: Joi.string().required().message({
//         "number.base": "Tugilgan sana  bolishi kerak",
//         "number.empty": "Tugilgan sana bosh bolmasligi kerak",
//         "any.required": "Tugilgan sana berilishi shart"
//         }),
//       address: Joi.string().min(2).max(40).required().message({
//         "string.base": "Mamlakat nomi stringda kiritilishi shart!",
//         "string.empty": "Mamlakat nomi bosh bolmasligi kerak",
//         "any.required": "Mamlakat nomi talab qilinadi va kiritilishi lozim!",
//         "string.min":
//           "Mamlakat nomi kamida  ikki ta belgidan iborat bolishi kerak!",
//         "string.max": "Mamlakat nomi 40 ta belgidan iborak bolishi kerak!",
//       }),
//       bio: Joi.string().min(50).max(1000).required().message({
//         "string.base": "A`zo tavfsifi stringda kiritilishi shart!",
//         "string.empty": "A`zo tavfsifi bosh bolmasligi kerak",
//         "any.required": "A`zo tavfsifi talab qilinadi va kiritilishi lozim!",
//         "string.min": "A`zo tavfsifi kamida 50 ta belgidan iborat bolishi kerak!",
//         "string.max": "A`zo tavfsifi 1000 ta belgidan iborak bolishi kerak!",
//       })
//     });
//     return membersValidate.validate(data);
//   } catch (error) {
//     return new Error(error);
//   }
// };

// module.exports = membersValidation;

const Joi = require("joi");
const currentYear = new Date().getFullYear();
const membersValidation = (data) => {
  try {
    const membersValudationSchema = Joi.object({
      fullName: Joi.string().min(2).max(100).required().messages({
        "string.base": "A`zo ismi string ko'rinishida bo'lishi shart!",
        "string.empty": "A`zo ismi bo'sh bo'lmasligi kerak!",
        "any.required": "A`zo ismi kiritilishi shart!",
        "string.min":
          "A`zo ismi kamida 2(ikki) ta belgidan iborat bo'lishi zarur!",
        "string.max":
          "A`zo ismi 100(yuz) ta belgidan ko'p bo'lmasligi zarur!",
      }),
      dateOfBirth: Joi.date().required().messages({
        "date.base":
          "A`zo tug'ilgan sanasi Date ko'rinishida berilishi shart!",
        "date.empty": "A`zo tug'ilgan sanasi bo'sh bo'lmasligi zarur!",
        "date.required": "A`zo tug'ilgan sanasi kiritish shart!",
      }),
  
        address: Joi.string().min(2).max(120).required().messages({
        "string.base": "Davlat string ko'rinishida berilishi shart!",
        "string.empty": `Davlat nomi maydoni bo'sh bo'lmasligi shart!`,
        "string.required": "Davlat nomini kiritish shart!",
        "string.min": "Davlat nomi 2 ta belgidan ko'p bo'lishi zarur!",
        "string.max": "Davlat nomi 120 ta belgidan kam bo'lishi shart",
      }),
      bio: Joi.string().min(1).max(100).required().messages({
        "string.base":
          "A`zo haqida ma'lumot string ko'rinishida bo'lishi shart!",
        "string.empty": "A`zo haqida ma'lumot bo'sh bo'lmasligi shart!",
        "any.required": "A`zo haqida ma'lumot kiritish shart",
        "string.min":
          "A`zo haqida malumot 1 ta belgidan ko'p bo'lishi shart!",
          "string.max":
          "A`zo ismi 100(yuz) ta belgidan ko'p bo'lmasligi zarur!",
      }),
    });
    return membersValudationSchema.validate(data);
  } catch (error) {
    return new Error(error);
  }
};
module.exports = membersValidation;
