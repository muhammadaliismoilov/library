const {Router} = require("express")
const { getBooks, addBook, updateBook, deleteBook, getOneBook, searchBooks } = require("../controllers/books.controller")
const validateBooks = require("../Middleware/books.middleware")
const { checkAdmin } = require("../Middleware/access_token_middleware")


const booksRouter = Router()

booksRouter.get("/get_books",getBooks)
booksRouter.get("/get_one_book/:id",getOneBook)
booksRouter.get("/search_books",searchBooks)
booksRouter.post("/add_book",[checkAdmin,validateBooks],addBook) // validator ishlamayabdi
booksRouter.put("/update_book/:id",checkAdmin,updateBook)
booksRouter.delete("/delete_book/:id",checkAdmin,deleteBook)


module.exports = booksRouter
