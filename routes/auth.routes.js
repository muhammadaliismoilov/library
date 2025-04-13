const Router =require("express")
const { register, verify } = require("../controllers/auth.controller")
const validateAuth = require("../Middleware/auth.middleware")


const authRouter = Router()

authRouter.post("/register",validateAuth,register)
authRouter.post("/verify",verify)

module.exports = authRouter


