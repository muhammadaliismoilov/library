const booksValidation = require("../Validators/books.validator");

const validateBooks = async (req, res, next) => { 
  try {
    const { error } = booksValidation(req.body);
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

module.exports = validateBooks;
