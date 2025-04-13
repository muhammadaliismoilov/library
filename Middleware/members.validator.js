const membersValidation = require("../Validators/members.validator");

const validateMembers = async (req, res, next) => {
  try {
    const { error } = membersValidation(req.body);
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

module.exports = validateMembers;
