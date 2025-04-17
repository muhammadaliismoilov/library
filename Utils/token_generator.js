const jwt = require("jsonwebtoken")

const accesssToken = (payload) => {
    return jwt.sign(payload,process.env.ACCESS_SECRET_KEY,{expiresIn:"15m"})
}

 const refreshToken = (payload) => {
    return jwt.sign(payload,process.env.REFRESH_SEKRET_KEY,{expiresIn:"7d"})
}
module.exports = {
    accesssToken,
    refreshToken
}