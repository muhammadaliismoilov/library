const BaseError = require("../Utils/base.error");
const jwt =require("jsonwebtoken")

const checkAdmin = (req,res,next) =>{
    const accesssToken = req.headers.cookie
    if (!accesssToken) {
        throw BaseError.Unauthorized("Token topilmadi")
    }
    const accesss = accesssToken.split(" ")[0].slice(12)

    
    if (!accesss) {
        throw BaseError.Unauthorized("Token topilmadi")
    }
    const decode = jwt.verify(accesss.slice(0,-1),process.env.ACCESS_SECRET_KEY)
    
    
    req.user = decode

    let role = ["admin","superadmin"]
    if (!role.includes(req.user.role)) {
        throw BaseError.Unauthorized("Sizda bunday ruxsat yoq!")
   
    }


next()
}
module.exports ={
    checkAdmin
}