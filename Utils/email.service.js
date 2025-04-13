const nodemailer = require("nodemailer")

async function emailSendingService(email,randomCode){
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.VERIFIR_EMAIL,
            pass:process.env.GOOGLE_PASS
        }
    })
    
    
    const emailOption = {
        from : process.env.VERIFIR_EMAIL,
        to : email,
        subject:"Email verifying",
        html:`<b>Email tasdiqlash uchun kodingiz ${randomCode}</b>`
    }
    
    transporter.sendMail(emailOption,(error,info) => {
        if (error) {
            console.log(error);
        }
        if (info) {
            console.log(info.messageId);
        }
    })
    
}






