
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
