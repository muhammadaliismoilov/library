const Router =require("express")
const { register, verify, login, logout, forgotPassword, changePassword } = require("../controllers/auth.controller")
const validateAuth = require("../Middleware/auth.middleware")
const { refreshTokenMiddleware } = require("../Middleware/refresh_token_middleware")


const authRouter = Router()

authRouter.post("/register",validateAuth,register)
authRouter.post("/verify",verify)
authRouter.post("/login",login)
authRouter.post("/refresh",refreshTokenMiddleware)
authRouter.post("/changePassword",changePassword)
authRouter.post("/forgot_password",forgotPassword)
authRouter.get("/logout",logout)

module.exports = authRouter


