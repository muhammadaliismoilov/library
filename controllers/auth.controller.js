const authModels = require("../Schema/auth.scheme");
const bcryptjs = require("bcryptjs");
const BaseError = require("../Utils/base.error");
const emailSenderService = require("../Utils/email.service");
const { version } = require("joi");

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
      otp: +randomCode,
      lastTime: lastTime,
    });
    res.status(200).json({
      message: `Siz roydatdan muvoffaqiyatli otdingiz va code ${email} ga yuborildi`,
    });
  } catch (error) {
    return next(error);
  }
};

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
      return next(
        BaseError.BadRequest(403, "Foydalanuvchi topilmadi")
      );
    }
    const now = new Date()
    if (foundedUser.lastTime < now) {
        return next(
            BaseError.BadRequest(403, "Vaqt tugagan!")
          );
    }
    if (code !== foundedUser.otp) {
        return next(
            BaseError.BadRequest(403, "Tasdiqlash kodi noto'g'ri!")
          );
    }
    foundedUser.isVerified = true
    foundedUser.otp = 0
    foundedUser.lastTime = 0
    await foundedUser.save()
    return res.status(200).json({
        message:"Emailingizni tekshiring!"
    })

  } catch (error) {
    return next(error);
  }
};

module.exports = {
  register,
  verify
};
