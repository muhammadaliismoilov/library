
const Joi = require("joi");
const currentYear = new Date().getFullYear();
const authValidation = (data) => {
  try {
    const authValudationSchema = Joi.object({
      userName: Joi.string().min(2).max(100).required().messages({
        "string.base": "Foydalanuvchi ismi string ko'rinishida bo'lishi shart!",
        "string.empty": "Foydalanuvchi ismi bo'sh bo'lmasligi kerak!",
        "any.required": "Foydalanuvchi ismi kiritilishi shart!",
        "string.min":
          "Foydalanuvchi ismi kamida 2(ikki) ta belgidan iborat bo'lishi zarur!",
        "string.max":
          "Foydalanuvchi ismi 100(yuz) ta belgidan ko'p bo'lmasligi zarur!",
      }),
      email: Joi.string().required().messages({
        "date.base":
          "Email berilishi shart!",
        "date.empty": "Email bo'sh bo'lmasligi zarur!",
        "date.required": "Email kiritish shart!",
      }),
      password: Joi.string().min(4).max(10).required().messages({
        "string.base": "Foydalanuvchi ismi string ko'rinishida bo'lishi shart!",
        "string.empty": "Foydalanuvchi ismi bo'sh bo'lmasligi kerak!",
          "string.required": "Parol kiritilishi shart!",
          "string.min":
          "Parol 4 ta belgidan kam bolmasligi kerak",
        "string.max":
          "Parol 10 ta belgidan ko`p bolmasligi kerak",
        })
    });
    return authValudationSchema.validate(data);
  } catch (error) {
    return new Error(error);
  }
};
module.exports = authValidation;
