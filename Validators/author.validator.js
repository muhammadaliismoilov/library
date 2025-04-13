const Joi = require("joi");
const currentYear = new Date().getFullYear;
const authorsValidation = (data) => {
  try {
    const authorsValidate = Joi.object({
      fullName: Joi.string().min(2).max(40).required().message({
        "string.base": "Muallif ismi stringda kiritilishi shart!",
        "string.empty": "Muallif ismi bosh bolmasligi kerak",
        "any.required": "Muallif ismi talab qilinadi va kiritilishi lozim!",
        "string.min":
          "Muallif ismi kamida  2 ta belgidan iborat bolishi kerak!",
        "string.max": "Muallif ismi 40 ta belgidan iborak bolishi kerak!",
      }),
      dateOfBrith: Joi.string().required().message({
        "number.base": "Tugilgan sana  bolishi kerak",
        "number.empty": "Tugilgan sana bosh bolmasligi kerak",
        "any.required": "Tugilgan sana berilishi shart"
        }),
        dateOfDeath: Joi.string().max(currentYear).required().message({
        "number.max": `Vafot etilgan sana ${currentYear} da kop bolmasligi kerak `,
        }),
      country: Joi.string().min(2).max(40).required().message({
        "string.base": "Mamlakat nomi stringda kiritilishi shart!",
        "string.empty": "Mamlakat nomi bosh bolmasligi kerak",
        "any.required": "Mamlakat nomi talab qilinadi va kiritilishi lozim!",
        "string.min":
          "Mamlakat nomi kamida  ikki ta belgidan iborat bolishi kerak!",
        "string.max": "Mamlakat nomi 40 ta belgidan iborak bolishi kerak!",
      }),
      bio: Joi.string().min(50).max(1000).required().message({
        "string.base": "Tavfsifi stringda kiritilishi shart!",
        "string.empty": "Tavfsifi bosh bolmasligi kerak",
        "any.required": "Tavfsifi talab qilinadi va kiritilishi lozim!",
        "string.min": "Tavfsifi kamida 50 ta belgidan iborat bolishi kerak!",
        "string.max": "Tavfsifi 1000 ta belgidan iborak bolishi kerak!",
      }),
    });
    return authorsValidate.validate(data);
  } catch (error) {
    return new Error(error);
  }
};

module.exports = authorsValidation;
