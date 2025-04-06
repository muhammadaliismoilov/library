const {Router} = require("express")
const { getAuthors, addAuthor, updateAuthor, getOneAuthor, deleteAuthor } = require("../controllers/author.controller")

const authorsRouter = Router()

authorsRouter.get("/get_authors",getAuthors)
authorsRouter.get("/get_one_author/:id",getOneAuthor)
authorsRouter.post("/add_author",addAuthor)
authorsRouter.put("/update_author/:id",updateAuthor)
authorsRouter.delete("/delete_author/:id",deleteAuthor)


module.exports = authorsRouter