const {Router} = require("express")
const { getBooks, addBook, updateBook, deleteBook, getOneBook } = require("../controllers/books.controller")

const booksRouter = Router()

booksRouter.get("/get_books",getBooks)
booksRouter.get("/get_one_book/:id",getOneBook)
booksRouter.post("/add_book",addBook)
booksRouter.put("/update_book/:id",updateBook)
booksRouter.delete("/delete_book/:id",deleteBook)


module.exports = booksRouter
