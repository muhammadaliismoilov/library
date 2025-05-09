const Joi = require("joi");
const currentYear = new Date().getFullYear();
const authorValidation = (data) => {
  try {
    const authorValudationSchema = Joi.object({
      author: Joi.string().min(2).max(100).required().messages({
        "string.base": "Author ismi string ko'rinishida bo'lishi shart!",
        "string.empty": "Author ismi bo'sh bo'lmasligi kerak!",
        "any.required": "Author ismi kiritilishi shart!",
        "string.min":
          "Author ismi kamida 2(ikki) ta belgidan iborat bo'lishi zarur!",
        "string.max":
          "Author ismi 100(yuz) ta belgidan ko'p bo'lmasligi zarur!",
      }),
      dateOfBirth: Joi.date().required().messages({
        "date.base":"Author tug'ilgan sanasi Date ko'rinishida berilishi shart!",
        "date.empty": "Author tug'ilgan sanasi bo'sh bo'lmasligi zarur!",
        "date.required": "Author tug'ilgan sanasi kiritish shart!",
      }),
      dateOfDeath: Joi.date()
        .max('now')
        .messages({
          "date.required": "Kitob yilini kiritish zarur!",
          "date.min": "Kitob yili kamida 600-yildan kam bo'lmasligi zarur!",
          "date.max": `Author vafot etgan sanasi ${currentYear} yildan o'tgan bo'lmasligi shart!`,
        }),
      country: Joi.string().min(2).max(120).required().messages({
        "string.base": "Davlat string ko'rinishida berilishi shart!",
        "string.empty": `Davlat nomi maydoni bo'sh bo'lmasligi shart!`,
        "string.required": "Davlat nomini kiritish shart!",
        "string.min": "Davlat nomi 2 ta belgidan ko'p bo'lishi zarur!",
        "string.max": "Davlat nomi 120 ta belgidan kam bo'lishi shart",
      }),
      bio: Joi.string().min(1).required().messages({
        "string.base":
          "Author haqida ma'lumot string ko'rinishida bo'lishi shart!",
        "string.empty": "Author haqida ma'lumot bo'sh bo'lmasligi shart!",
        "any.required": "Author haqida ma'lumot kiritish shart",
        "string.min":
          "Author haqida malumot 1 ta belgidan ko'p bo'lishi shart!",
      }),
    });
    return authorValudationSchema.validate(data);
  } catch (error) {
    return new Error(error);
  }
};
module.exports = authorValidation;

// const Joi = require("joi");
// const currentYear = new Date().getFullYear();

// const authorValidation = (data) => {
//   const authorValidationSchema = Joi.object({
//     author: Joi.string().min(2).max(100).required().messages({
//       "string.base": "Muallif ismi string ko'rinishida bo'lishi kerak!",
//       "string.empty": "Muallif ismi bo'sh bo'lmasligi kerak!",
//       "any.required": "Muallif ismini kiritish shart!",
//       "string.min": "Muallif ismi kamida 2 ta belgidan iborat bo'lishi kerak!",
//       "string.max": "Muallif ismi 100 ta belgidan oshmasligi kerak!",
//     }),
//     dateOfBirth: Joi.date()
//       .max(currentYear)
//       .required()
//       .messages({
//         "date.base": "Tug'ilgan sana to'g'ri sana ko'rinishida bo'lishi kerak!",
//         "date.empty": "Tug'ilgan sana bo'sh bo'lmasligi kerak!",
//         "any.required": "Tug'ilgan sanani kiritish shart!",
//         "date.max": `Tug'ilgan sana ${currentYear} yildan oshmasligi kerak!`,
//       }),
//     dateOfDeath: Joi.date()
//       .min(Joi.ref("dateOfBirth"))
//       .max(currentYear)
//       .optional()
//       .allow(null)
//       .messages({
//         "date.base": "Vafot sanasi to'g'ri sana ko'rinishida bo'lishi kerak!",
//         "date.min": "Vafot sanasi tug'ilgan sanadan keyin bo'lishi kerak!",
//         "date.max": `Vafot sanasi ${currentYear} yildan oshmasligi kerak!`,
//       }),
//     country: Joi.string().min(2).max(120).required().messages({
//       "string.base": "Davlat nomi string ko'rinishida bo'lishi kerak!",
//       "string.empty": "Davlat nomi bo'sh bo'lmasligi kerak!",
//       "any.required": "Davlat nomini kiritish shart!",
//       "string.min": "Davlat nomi kamida 2 ta belgidan iborat bo'lishi kerak!",
//       "string.max": "Davlat nomi 120 ta belgidan oshmasligi kerak!",
//     }),
//     bio: Joi.string().min(1).required().messages({
//       "string.base": "Biografiya string ko'rinishida bo'lishi kerak!",
//       "string.empty": "Biografiya bo'sh bo'lmasligi kerak!",
//       "any.required": "Biografiyani kiritish shart!",
//       "string.min": "Biografiya kamida 1 ta belgidan iborat bo'lishi kerak!",
//     }),
//   });

//   if (Array.isArray(data)) {
//     const results = data.map((item, index) => ({
//       index,
//       result: authorValidationSchema.validate(item, { abortEarly: false }),
//     }));

//     const errors = results
//       .filter(({ result }) => result.error)
//       .map(({ index, result }) => ({
//         index,
//         errors: result.error.details.map((err) => err.message),
//       }));

//     if (errors.length > 0) {
//       return { error: errors };
//     }
//     return { value: data };
//   }

//   return authorValidationSchema.validate(data, { abortEarly: false });
// };


// module.exports = authorValidation;