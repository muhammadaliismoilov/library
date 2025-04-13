const {Router} = require("express")
const { getAuthors, addAuthor, updateAuthor, getOneAuthor, deleteAuthor, searchAuthors } = require("../controllers/author.controller")
const validateAuthors = require("../Middleware/authors.middleware")

const authorsRouter = Router()

authorsRouter.get("/get_authors",getAuthors)
authorsRouter.get("/get_one_author/:id",getOneAuthor)
authorsRouter.get("/search_authors",searchAuthors)
authorsRouter.post("/add_author",validateAuthors,addAuthor) /// validator ishlamayabdi
authorsRouter.put("/update_author/:id",updateAuthor)
authorsRouter.delete("/delete_author/:id",deleteAuthor)


module.exports = authorsRouter