const authorsValidation = require("../Validators/author.validator");

const validateAuthors = async (req, res, next) => {
  try {
    const { error } = authorsValidation(req.body);
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

module.exports = validateAuthors;
