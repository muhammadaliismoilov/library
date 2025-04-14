// const Joi = require("joi");
// const commentValidation = (data) => {
//   try {
//     const commentValidate = Joi.object({
//       comment: Joi.string().min(2).max(500).required().message({
//         "string.base": "UserName stringda kiritilishi shart!",
//         "string.empty": "UserName bosh bolmasligi kerak",
//         "any.required": "UserName talab qilinadi va kiritilishi lozim!",
//         "string.min":
//           "UserName kamida  2 ta belgidan iborat bolishi kerak!",
//         "string.max": "UserName 40 ta belgidan iborak bolishi kerak!",
//       }),
//       bookId:Joi.string().required().message({
//         "string.base": "Kitob ID si stringda kiritilishi shart!",
//         "string.empty": "Kitob ID bosh bolmasligi kerak",
//         "any.required": "Kitob ID talab qilinadi va kiritilishi lozim!",
//       })
//     });
//     return commentValidate.validate(data);
//   } catch (error) {
//     return new Error(error);
//   }
// };

// module.exports = commentValidation;
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
