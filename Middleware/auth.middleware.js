const authValidation = require("../Validators/auth.validator");

const validateAuth = async (req, res, next) => {
  try {
    const { error } = authValidation(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    return next();
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = validateAuth;
