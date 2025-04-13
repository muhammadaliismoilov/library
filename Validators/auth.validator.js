const Joi = require("joi");
const authValidation = (data) => {
  try {
    const authValidate = Joi.object({
      userName: Joi.string().min(2).max(40).required().message({
        "string.base": "UserName stringda kiritilishi shart!",
        "string.empty": "UserName bosh bolmasligi kerak",
        "any.required": "UserName talab qilinadi va kiritilishi lozim!",
        "string.min":
          "UserName kamida  2 ta belgidan iborat bolishi kerak!",
        "string.max": "UserName 40 ta belgidan iborak bolishi kerak!",
      }),
      email: Joi.string().min(2).max(100).required().message({
        "string.base": "UserName stringda kiritilishi shart!",
        "string.empty": "UserName bosh bolmasligi kerak",
        "any.required": "UserName talab qilinadi va kiritilishi lozim!",
        "string.min":
          "UserName kamida  ikki ta belgidan iborat bolishi kerak!",
        "string.max": "UserName 100 ta belgidan iborak bolishi kerak!",
      }),
      password: Joi.string().min(4).max(20).required().message({
        "string.base": "Parok stringda kiritilishi shart!",
        "string.empty": "Parok bosh bolmasligi kerak",
        "any.required": "Parok talab qilinadi va kiritilishi lozim!",
        "string.min": "Parok kamida 40 ta belgidan iborat bolishi kerak!",
        "string.max": "Parok 20 ta belgidan iborak bolishi kerak!",
      }),
    });
    return authValidate.validate(data);
  } catch (error) {
    return new Error(error);
  }
};

module.exports = authValidation;
