const Router =require("express")
const { register, verify, login, logout, forgotPassword, changePassword } = require("../controllers/auth.controller")
const validateAuth = require("../Middleware/auth.middleware")

const authRouter = Router()
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Foydalanuvchini ro'yxatdan o'tkazish
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - email
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       200:
 *         description: Ro'yxatdan muvaffaqiyatli o'tdi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Siz roydatdan muvoffaqiyatli otdingiz va code johndoe@example.com ga yuborildi
 *       403:
 *         description: Foydalanuvchi allaqachon ro'yxatdan o'tgan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Siz royxatdan otgansiz! Login orqali kiring
 */
authRouter.post("/register",validateAuth,register)

/**
 * @swagger
 * /verify:
 *   post:
 *     summary: Email orqali yuborilgan OTP kodni tasdiqlash
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - code
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               code:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Email tasdiqlandi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Elektron pochtangizni tasdiqladingiz!
 *       403:
 *         description: Xatolik mavjud (masalan, noto‘g‘ri kod yoki foydalanuvchi topilmadi)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tasdiqlash kodi noto'g'ri!
 */
authRouter.post("/verify",verify)

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Foydalanuvchi login qilish
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: mySecurePassword123
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli login qilindi va access token qaytarildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Elektron pochtangizni tasdiqladingiz!
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       403:
 *         description: Email yoki parol noto'g'ri yoki foydalanuvchi topilmadi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Yaroqsiz parol yoki tasdiqlash kodini tekshiring!
 */
authRouter.post("/login",login)

/**
 * @swagger
 * /forgot_password:
 *   post:
 *     summary: Parolni tiklash kodi yuborish
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Tiklash kodi emailingizga yuborildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 xabar:
 *                   type: string
 *                   example: Parolni tiklash kodi emailingizga yuborildi
 *       404:
 *         description: Foydalanuvchi topilmadi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 xabar:
 *                   type: string
 *                   example: Foydalanuvchi topilmadi
 */
authRouter.post("/forgot_password",forgotPassword)

/**
 * @swagger
 * /change_password:
 *   post:
 *     summary: Reset kodi orqali yangi parol o‘rnatish
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - code
 *               - newPassword
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               code:
 *                 type: string
 *                 example: "123456"
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 example: MyNewSecurePassword!
 *     responses:
 *       200:
 *         description: Parol muvaffaqiyatli yangilandi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 xabar:
 *                   type: string
 *                   example: Parol muvaffaqiyatli yangilandi
 *       400:
 *         description: Kod yaroqsiz yoki muddati o‘tgan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Yaroqsiz yoki muddati o`tgan kod
 */
authRouter.post("/change_password",changePassword)

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Foydalanuvchini tizimdan chiqarish (logout)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Tizimdan muvaffaqiyatli chiqdi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tizimdan muvaffaqiyatli chiqdingiz!
 *       404:
 *         description: Foydalanuvchi topilmadi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Foydalanuvchi topilmadi
 */
authRouter.get("/logout",logout)
module.exports = authRouter


