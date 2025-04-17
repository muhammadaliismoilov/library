
// const Joi = require("joi");
// const currentYear = new Date().getFullYear();
// const authorValidation = (data) => {
//   try {
//     const authorValudationSchema = Joi.object({
//         comment: Joi.string().min(2).max(100).required().messages({
//         "string.base": "Author ismi string ko'rinishida bo'lishi shart!",
//         "string.empty": "Author ismi bo'sh bo'lmasligi kerak!",
//         "any.required": "Author ismi kiritilishi shart!",
//         "string.min":
//           "Author ismi kamida 2(ikki) ta belgidan iborat bo'lishi zarur!",
//         "string.max":
//           "Author ismi 100(yuz) ta belgidan ko'p bo'lmasligi zarur!",
//       }),
//         bookId: Joi.string().min(2).max(120).required().messages({
//         "string.base": "Davlat string ko'rinishida berilishi shart!",
//         "string.empty": `Davlat nomi maydoni bo'sh bo'lmasligi shart!`,
//         "string.required": "Davlat nomini kiritish shart!",
//         "string.min": "Davlat nomi 2 ta belgidan ko'p bo'lishi zarur!",
//         "string.max": "Davlat nomi 120 ta belgidan kam bo'lishi shart",
//       })
//     });
//     return authorValudationSchema.validate(data);
//   } catch (error) {
//     return new Error(error);
//   }
// };
// module.exports = authorValidation;
