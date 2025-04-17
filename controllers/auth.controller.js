const authModels = require("../Schema/auth.scheme");
const bcryptjs = require("bcryptjs");
const BaseError = require("../Utils/base.error");
const emailSenderService = require("../Utils/email.service");
const { accesssToken, refreshToken } = require("../Utils/token_generator");
 

///     REGISTER      ///
const register = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    const foundedUser = await authModels.findOne({ email });
    if (foundedUser) {
      return next(
        BaseError.BadRequest(403, "Siz royxatdan otgansiz! Login orqali kiring")
      );
    }
    const hashedpassword = await bcryptjs.hash(password, 10);
    const randomCode = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");
    const info = emailSenderService(email, randomCode);

    const lastTime = new Date();
    const minuts = lastTime.getMinutes();
    lastTime.setMinutes(minuts + 2);

    await authModels.create({
      userName,
      email,
      password: hashedpassword,
      otp: randomCode,
      lastTime: lastTime,
    });
    res.status(200).json({
      message: `Siz roydatdan muvoffaqiyatli otdingiz va code ${email} ga yuborildi`,
    });
  } catch (error) {
    throw next(error);
  }
};
///     VERIFY      ///
const verify = async (req, res, next) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) {
      return res.status(403).json({
        message: "Email va code yuborilishi kerak!",
      });
    }
    const foundedUser = await authModels.findOne({ email });
    if (!foundedUser) {
      return next(BaseError.BadRequest(403, "Foydalanuvchi topilmadi"));
    }
    const now = new Date();
    if (foundedUser.lastTime < now) {
      return next(BaseError.BadRequest(403, "Vaqt tugagan!"));
    }
    

    if (code !== foundedUser.otp) {
      return next(BaseError.BadRequest(403, "Tasdiqlash kodi noto'g'ri!"));
    }
    foundedUser.isVerified = true;
    foundedUser.otp = 0;
    foundedUser.lastTime = 0;
    await foundedUser.save();
    return res.status(200).json({
      message: "Elektron pochtangizni tasdiqladingiz!",
    });
  } catch (error) {
    throw next(error);
  }
};
///     LOGIN     ///
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(403).json({
        message: "Email va code yuborilishi kerak!",
      });
    }

    const foundedUser = await authModels.findOne({ email });
    if (!foundedUser) {
      return next(BaseError.BadRequest(403, "Foydalanuvchi topilmadi"));
    }
    const decode = await bcryptjs.compare(password, foundedUser.password);
    if (decode && foundedUser.isVerified) {
      const payload = {
        email: foundedUser.email,
        id: foundedUser.id,
        role: foundedUser.role,
      };
      const accesss = accesssToken(payload);
      const refresh = refreshToken(payload);
      res.cookie("accessToken", accesss, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      });
      res.cookie("refreshToken", refresh, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        message: "Elektron pochtangizni tasdiqladingiz!",
        token: accesss
      });
    } else {
      return next( BaseError.BadRequest(
        403,
        "Yaroqsiz parol yoki tasdiqlash kodini tekshiring!"
      ))
    }
  } catch (error) {
    throw next(error);
  }
};
///     LOGOUT     ///
const logout = async(req,res,next) =>{
  try {
  
    res.clearCookie("accaccesssToken",a)
    res.clearCookie("refreshToken",refresh);
    
  
    return res.status(200).json({
      message: "Tizimdan muvaffaqiyatli chiqdingiz!",
    });
  } catch (error) {
    throw next(error)
  }
}


module.exports = {
  register,
  verify,
  login,
  logout
};
