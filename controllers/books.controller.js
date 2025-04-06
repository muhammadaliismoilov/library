const { client, connectDB } = require("../config/config.db");
const { ObjectId } = require("mongodb");

const database = client.db("library");
const booksCollection = database.collection("books");

///////   GET BOOKS         /////
const getBooks = async (req, res) => {
  try {
    const books = await booksCollection.find().toArray();
    // if (books.length === 0) {

    // }
    return res.status(404).json(books);
  } catch (error) {
    return res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

///         GET ONE BOOK        ///
const getOneBook = async (req, res) => {
  try {
    const bookId = new ObjectId(req.params.id)
    const foundedBook = await booksCollection.findOne({_id:bookId})
    if (!foundedBook) {
        return res.status(404).json({
            message:`${bookId} li kitob topilmadi`
        })
    }
    return res.status(200).json(foundedBook);
  } catch (error) {
    return res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

//////       ADD BOOK       /////
const addBook = async (req, res) => {
  try {
    const newBook = await booksCollection.insertOne(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    return res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

///         UPDATE BOOK     ////
const updateBook = async (req, res) => {
  try {
    const bookId = new ObjectId(req.params.id);
    const foundedBook = await booksCollection.findOne({ _id: bookId });
    if (!foundedBook) {
      return res.status(404).json({
        message: `${bookId} li kitob topilmadi`,
      });
    }
    await booksCollection.updateOne({ _id: bookId }, { $set: req.body });
    res.status(200).json({
      message: "Ma`lumotlar o`zgardi",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

////            DELETE BOOK             ///
const deleteBook = async (req, res) => {
  try {
    const bookId = new ObjectId(req.params.id);
    const foundedBook = await booksCollection.findOne({ _id: bookId });
    if (!foundedBook) {
      return res.status(404).json({
        message: `${bookId} li kitob topilmadi`,
      });
    }
    await booksCollection.deleteOne({ _id: bookId });
    res.status(200).json({
      message: "Kitob o`chirildi",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

module.exports = {
  getBooks,
  getOneBook,
  addBook,
  updateBook,
  deleteBook,
};
