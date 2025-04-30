const express = require("express")
const cors = require("cors")
require("dotenv").config()


const app = express()
const PORT = process.env.PORT || 4001

app.use(cors())
app.use(express.json())
const error_middeleware = require("./Middleware/error.middleware")
const booksRouter = require("./routes/books.routes")
const authorsRouter = require("./routes/authors.routes")
const membersRouter = require("./routes/members.routes")
const authRouter = require("./routes/auth.routes")
const logger = require("./Utils/logger")
const swaggerUiExpress = require("swagger-ui-express")
const swaggerDocument =require("./Utils/swagger")
const {connectDB} = require("./config/config.db")


app.use(booksRouter)
app.use(authorsRouter)
app.use(membersRouter)
app.use(authRouter)
// app.use(commentRouter)
app.use(`/api-docs`,swaggerUiExpress.serve,swaggerUiExpress.setup(swaggerDocument))



connectDB()
app.use(error_middeleware)
app.use((req,res,next) => {
    res.status(404).json({
        message:"Bunday endpoint mavjud emas!"
    })
})

app.listen(PORT, () => {
    console.log(`Server ${PORT} da ishladi`)
    logger.info(`Server ${PORT} da ishladi`)
})




