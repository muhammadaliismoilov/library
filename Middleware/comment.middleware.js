// const commentValidation = require("../Validators/comment.validator");

// const validatecomment = async (req, res, next) => {
//   try {
//     const { error } = commentValidation(req.body);
//     if (error) {
//       return res.status(400).json({
//         message: error.details[0].message,
//       });
//     }
//     return next();
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

// module.exports = validatecomment;
