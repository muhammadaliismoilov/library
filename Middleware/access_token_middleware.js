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

// const checkAdmin = (req, res, next) => {
//     try {
//         // Authorization sarlavhasidan tokenni olish (Bearer <token> formatida kutiladi)
//         const authHeader = req.headers.authorization;

//         console.log(req.headers);
        
//         if (!authHeader || !authHeader.startsWith('Bearer ')) {
//             throw BaseError.Unauthorized('Token topilmadi');
//         }

//         // "Bearer " dan keyin tokenni ajratib olish
//         const accessToken = authHeader.split(' ')[1];
//         if (!accessToken) {
//             throw BaseError.Unauthorized('Token topilmadi');
//         }

//         // JWT tokenni tekshirish
//         const decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY);
//         req.user = decoded; // Dekodlangan foydalanuvchi ma'lumotlarini req ob'ektiga qo'shish

//         // Ruxsat berilgan rollarni tekshirish
//         const allowedRoles = ['admin', 'superadmin'];
//         if (!allowedRoles.includes(decoded.role)) {
//             throw BaseError.Unauthorized('Sizda bunday ruxsat yoq!');
//         }

//         // Keyingi middleware yoki route ga o'tish
//         next();
//     } catch (error) {
//         // Xatolarni ushlab, mos ravishda javob qaytarish
//         if (error instanceof jwt.JsonWebTokenError) {
//             return res.status(401).json({ message: 'Yaroqsiz token' });
//         }
//         next(error); // BaseError yoki boshqa xatolarni keyingi xato ishlovchiga yuborish
//     }
// };


module.exports ={
    checkAdmin
}