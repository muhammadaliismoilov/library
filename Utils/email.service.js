// const nodemailer = require("nodemailer")
// require("dotenv").config()
// async function emailSendingService(email, randomCode) {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.VERIFIR_EMAIL,
//         pass: process.env.GOOGLE_PASS,
//       },
//     });
//     const emailOption = {
//       from: process.env.VERIFIR_EMAIL,
//       to: email,
//       subject: "Email verifying",
//       html: `<b>Email tasdiqlash uchun kodingiz ${randomCode}</b>`,
      
//     };
//     const info = await transporter.sendMail(emailOption);
//     return info; 
//   } catch (error) {
//     throw new Error("Email jo`natishda xatolik yuz berdi");
//   }
// }
// module.exports = emailSendingService;

const nodemailer = require("nodemailer");
require("dotenv").config();

async function emailSendingService(email, randomCode) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.VERIFIR_EMAIL,
        pass: process.env.GOOGLE_PASS,
      },
    });

    // Transporter ulanishini tekshirish
    await transporter.verify();
    console.log("SMTP ulanishi muvaffaqiyatli!");

    const emailOption = {
      from: process.env.VERIFIR_EMAIL,
      to: email,
      subject: "Email verifying",
      html: `<b>Email tasdiqlash uchun kodingiz ${randomCode}</b>`,
    };

    const info = await transporter.sendMail(emailOption);
    console.log("Email jo‘natildi:", info);
    return info;
  } catch (error) {
    console.error("Email jo‘natish xatosi:", error);
    throw new Error(`Email jo‘natishda xatolik: ${error.message}`);
  }
}

module.exports = emailSendingService;