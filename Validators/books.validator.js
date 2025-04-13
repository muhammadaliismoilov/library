const Joi = require("joi");
const currentYear = new Date().getFullYear;
const booksValidation = (data) => {
  try {
    const booksValidate = Joi.object({
      titlt: Joi.string().min(2).max(40).required().message({
        "string.base": "Kitob nomi stringda kiritilishi shart!",
        "string.empty": "Kitob nomi bosh bolmasligi kerak",
        "any.required": "Kitob nomi talab qilinadi va kiritilishi lozim!",
        "string.min":
          "Kitob nomi kamida  ikki ta belgidan iborat bolishi kerak!",
        "string.max": "Kitob nomi 40 ta belgidan iborak bolishi kerak!",
      }),
      pages: Joi.number().min(20).max(5000).required().message({
        "number.base": "Kitob varoqlari number bolishi kerak",
        "number.empty": "Kitob varoqlari bosh bolmasligi kerak",
        "any.required": "Kitob varoqlari berilishi shart",
        "number.min": "Kitob varoqlari 20 dan kam bolmasligi kerak",
        "number.max": "kitob varoqlari 5000 dan kop  bolmasligi kerak ",
      }),
      year: Joi.number()
        .min(1800)
        .max(currentYear)
        .required()
        .message({
          "number.base": "Kitob yili number bolishi kerak",
          "number.empty": "Kitob yili bosh bolmasligi kerak",
          "any.required": "Kitob yili berilishi shart",
          "number.min": "Kitob yili 1800 dan kam bolmasligi kerak",
          "number.max": `Kitob yili ${currentYear} da kop bolmasligi kerak `,
        }),
      price: Joi.number().min(0).required().message({
        "number.base": "Kitob narxi number bolishi kerak",
        "number.empty": "Kitob narxi bosh bolmasligi kerak",
        "any.required": "Kitob narxi berilishi shart",
        "number.min": "Kitob narxi 0 dan kam bolmasligi kerak",
      }),
      country: Joi.string().min(2).max(40).required().message({
        "string.base": "Mamlakat nomi stringda kiritilishi shart!",
        "string.empty": "Mamlakat nomi bosh bolmasligi kerak",
        "any.required": "Mamlakat nomi talab qilinadi va kiritilishi lozim!",
        "string.min":
          "Mamlakat nomi kamida  ikki ta belgidan iborat bolishi kerak!",
        "string.max": "Mamlakat nomi 40 ta belgidan iborak bolishi kerak!",
      }),
      author: Joi.string().min(2).max(50).required().message({
        "string.base": "Muallif stringda kiritilishi shart!",
        "string.empty": "Muallif bosh bolmasligi kerak",
        "any.required": "Muallif talab qilinadi va kiritilishi lozim!",
        "string.min": "Muallif kamida  2 ta belgidan iborat bolishi kerak!",
        "string.max": "Muallif 40 ta belgidan iborak bolishi kerak!",
      }),
      discription: Joi.string().min(50).max(1000).required().message({
        "string.base": "Tavfsifi stringda kiritilishi shart!",
        "string.empty": "Tavfsifi bosh bolmasligi kerak",
        "any.required": "Tavfsifi talab qilinadi va kiritilishi lozim!",
        "string.min": "Tavfsifi kamida 50 ta belgidan iborat bolishi kerak!",
        "string.max": "Tavfsifi 1000 ta belgidan iborak bolishi kerak!",
      }),
    });
    return booksValidate.validate(data);
  } catch (error) {
    return new Error(error);
  }
};

module.exports = booksValidation;
