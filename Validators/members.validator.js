const Joi = require("joi");
const currentYear = new Date().getFullYear;
const membersValidation = (data) => {
  try {
    const membersValidate = Joi.object({
      fullName: Joi.string().min(2).max(40).required().message({
        "string.base": "A`zo ismi stringda kiritilishi shart!",
        "string.empty": "A`zo ismi bosh bolmasligi kerak",
        "any.required": "A`zo ismi talab qilinadi va kiritilishi lozim!",
        "string.min":
          "A`zo ismi kamida  2 ta belgidan iborat bolishi kerak!",
        "string.max": "A`zo ismi 40 ta belgidan iborak bolishi kerak!",
      }),
      dateOfBrith: Joi.string().required().message({
        "number.base": "Tugilgan sana  bolishi kerak",
        "number.empty": "Tugilgan sana bosh bolmasligi kerak",
        "any.required": "Tugilgan sana berilishi shart"
        }),
      address: Joi.string().min(2).max(40).required().message({
        "string.base": "Mamlakat nomi stringda kiritilishi shart!",
        "string.empty": "Mamlakat nomi bosh bolmasligi kerak",
        "any.required": "Mamlakat nomi talab qilinadi va kiritilishi lozim!",
        "string.min":
          "Mamlakat nomi kamida  ikki ta belgidan iborat bolishi kerak!",
        "string.max": "Mamlakat nomi 40 ta belgidan iborak bolishi kerak!",
      }),
      bio: Joi.string().min(50).max(1000).required().message({
        "string.base": "A`zo tavfsifi stringda kiritilishi shart!",
        "string.empty": "A`zo tavfsifi bosh bolmasligi kerak",
        "any.required": "A`zo tavfsifi talab qilinadi va kiritilishi lozim!",
        "string.min": "A`zo tavfsifi kamida 50 ta belgidan iborat bolishi kerak!",
        "string.max": "A`zo tavfsifi 1000 ta belgidan iborak bolishi kerak!",
      })
    });
    return membersValidate.validate(data);
  } catch (error) {
    return new Error(error);
  }
};

module.exports = membersValidation;
