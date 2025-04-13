const booksModels = require("../Schema/books.schema")

///////   GET BOOKS         /////
const getBooks = async (req, res,next) => {
  try {
    const books = await booksModels.find().populate("auther","-_id  -dateOfBrith -dateOfDeath -country -bio")
    if (books.length === 0) {
      return res.status(404).json({
        message:"Kitoblar topilmadi!"
      })
    }
    return res.status(404).json(books);
  } catch (error) {
    next(error)
  }
};

///         GET ONE BOOK        ///
const getOneBook = async (req, res,next) => {
  try {
    const foundedBook = await booksModels.findById(req.params.id)
    if (!foundedBook) {
        return res.status(404).json({
            message:`Kitob topilmadi`
        })
    }
    
    return res.status(200).json(foundedBook);
  } catch (error) {
    next(error)
  }
};

///     SEARCH AUTHORS      ///
const searchBooks = async (req,res,next) =>{
  try {
    if (req.query.title) {
      const result = await booksModels.find({
        title:{$regex :req.query.title , $options : "i"}
      })
    return res.json(result)
    }
    if (req.query.author) {
      const result = await booksModels.find({
        author : {$regex :req.query.author , $options : "i"}
      })
      return res.json(result)
    }
  } catch (error) {
    next(error)
  }
}

//////       ADD BOOK       /////
const addBook = async (req, res,next) => {
  try {
    const newBook = await booksModels.create(req.body);
    res.status(201).json({
      message:"Yangi kitob qoshildi"
    });
  } catch (error) {
    next(error)
  }
};

///         UPDATE BOOK     ////
const updateBook = async (req, res,next) => {
  try {
    const foundedBook = await booksModels.findById(req.params.id)
    if (!foundedBook) {
      return res.status(404).json({
        message: `Kitob topilmadi`,
      });
    }
    await booksModels.findByIdAndUpdate(req.params.id, req.body)
     res.status(201).json({
      message: "Ma`lumotlar o`zgardi",
    });
  } catch (error) {
    next(error)
  }
};

////            DELETE BOOK             ///
const deleteBook = async (req, res,next) => {
  try {
    const foundedBook = await booksModels.findById(req.params.id)
    if (!foundedBook) {
      return res.status(404).json({
        message: `Kitob topilmadi`,
      });
    }
    await booksModels.findByIdAndDelete(req.params.id)
    res.status(200).json({
      message: "Kitob o`chirildi",
    });
  } catch (error) {
    next(error)
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
