const express = require("express")
const cors = require("cors")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 4001

app.use(cors())
app.use(express.json())
const booksRouter = require("./routes/books.routes")
app.use(booksRouter)
const authorsRouter = require("./routes/authors.routes")
app.use(authorsRouter)


app.listen(PORT, () => {
    console.log(`Server ${PORT} da ishladi`);
})




