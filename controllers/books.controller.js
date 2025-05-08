const booksModels = require("../Schema/books.schema");
const authorModels = require("../Schema/authors.schema");

///////   GET BOOKS         /////
const getBooks = async (req, res, next) => {
  try {
    const books = await booksModels.find();
    if (books.length === 0) {
      return next(BaseError.BadRequest(404, "Kitoblar topilmadi!"));
    }
    return res.status(404).json(books);
  } catch (error) {
    next(error);
  }
};

///         GET ONE BOOK        ///
const getOneBook = async (req, res, next) => {
  try {
    const foundedBook = await booksModels.findById(req.params.id);
    if (!foundedBook) {
      return next(BaseError.BadRequest(404, "Kitob topilmadi!"));
    }

    return res.status(200).json(foundedBook);
  } catch (error) {
    next(error);
  }
};

///     SEARCH AUTHORS      ///
const searchBooks = async (req, res, next) => {
  try {
    if (req.query.title) {
      const result = await booksModels.find({
        title: { $regex: req.query.title, $options: "i" },
      });
      return res.json(result);
    }
    if (req.query.author) {
      const result = await booksModels.find({
        author: { $regex: req.query.author, $options: "i" },
      });
      return res.json(result);
    }
  } catch (error) {
    next(error);
  }
};

//////       ADD BOOK       /////
const addBook = async (req, res, next) => {
  // try {
  //   const author = await authorModels.findOne({ fullName: req.body.author });
  //   console.log(author);
    
  //   if (!author) {
  //     return next(BaseError.BadRequest(404, "Muallif topilmadi!"));
  //   }
  //   const newBook = await booksModels.create({
  //     title: req.body.title,
  //     pages:req.body.pages,
  //     year: req.body.year,
  //     price: req.body.price,
  //     country:req.body.country,
  //     author: author.author,
  //     discription:req.body.discription
  //   });

  //   res.status(201).json({
  //     message: "Yangi kitob qo‘shildi",
  //     book: newBook,
  //   });
  // } catch (error) {
  //   next(error);
  // }
   try {
    // To‘g‘ri field bilan izlash
    const author = await authorModels.findOne({ author: req.body.author });
    console.log("Topilgan muallif:", author);

    if (!author) {
      return next(BaseError.BadRequest(404, "Muallif topilmadi!"));
    }

    // Yangi kitob yaratish
    const newBook = await booksModels.create({
      title: req.body.title,
      pages: req.body.pages,
      year: req.body.year,
      price: req.body.price,
      country: req.body.country,
      author: author.author, // bu yerga muallif ismi
      discription: req.body.discription,
    });

    // Javob qaytarish
    res.status(201).json({
      message: "Yangi kitob qo'shildi",
      book: {
        ...newBook._doc, // MongoDB hujjatini JSON holatda qaytarish
        author: author.author, // muallif ismini alohida chiqarish
      },
    });
  } catch (error) {
    next(error);
  }

};

///         UPDATE BOOK     ////
const updateBook = async (req, res, next) => {
  try {
    const foundedBook = await booksModels.findById(req.params.id);
    if (!foundedBook) {
      return next(BaseError.BadRequest(404, "Kitob topilmadi!"));
    }
    await booksModels.findByIdAndUpdate(req.params.id, req.body);
    res.status(201).json({
      message: "Ma`lumotlar o`zgardi",
    });
  } catch (error) {
    next(error);
  }
};

////            DELETE BOOK             ///
const deleteBook = async (req, res, next) => {
  try {
    const foundedBook = await booksModels.findById(req.params.id);
    if (!foundedBook) {
      return next(BaseError.BadRequest(404, "Kitob topilmadi!"));
    }
    await booksModels.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Kitob o`chirildi",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBooks,
  getOneBook,
  searchBooks,
  addBook,
  updateBook,
  deleteBook,
};
