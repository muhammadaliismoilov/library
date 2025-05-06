const Router = require("express")
const { getMembers, getOneMember, searchMembers, updateMember, deleteMember} = require("../controllers/members.controller")
const chekAdmin = require("../Middleware/access_token_middleware")

const membersRouter = Router()
/**
 * @swagger
 * /get_members:
 *   get:
 *     summary: Barcha a'zolar ro‘yxatini olish
 *     tags: [Members]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A'zolar muvaffaqiyatli qaytarildi
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 661fc7a8ef28f317e4e12bba
 *                   fullName:
 *                     type: string
 *                     example: Jasur Qodirov
 *                   dateOfBirth:
 *                     type: string
 *                     format: date
 *                     example: 1995-01-01
 *                   address:
 *                     type: string
 *                     example: Samarqand
 *                   bio:
 *                     type: string
 *                     example: Men kitob o‘qishga qiziqaman...
 *       401:
 *         description: Token kiritilmagan yoki noto‘g‘ri
 *       403:
 *         description: Sizda bu ma’lumotni ko‘rishga ruxsat yo‘q
 */
membersRouter.get("/get_members",chekAdmin,getMembers)
/**
 * @swagger
 * /get_one_member/{id}:
 *   get:
 *     summary: ID bo‘yicha a’zoni olish
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: A’zoning ID raqami
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A’zo muvaffaqiyatli topildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 661fc7a8ef28f317e4e12bba
 *                 fullName:
 *                   type: string
 *                   example: Jasur Qodirov
 *                 dateOfBirth:
 *                   type: date
 *                   example: 1995-01-01
 *                 address:
 *                   type: string
 *                   example: samarqand
 *                 bio:
 *                   type: string
 *                   example: men kitob oqishga qiziqaman.......
 *       404:
 *         description: A’zo topilmadi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Muallif topilmadi!
 */
membersRouter.get("/get_one_member/:id",getOneMember)
/**
 * @swagger
 * /update_member/{id}:
 *   put:
 *     summary: A'zo ma'lumotlarini yangilash
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Yangilanadigan a'zoning ID'si
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Jasur Qodirov
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 example: 1995-01-01
 *               address:
 *                 type: string
 *                 example: Samarqand
 *               bio:
 *                 type: string
 *                 example: Men kitob o'qishga qiziqaman...
 *     responses:
 *       200:
 *         description: A'zo ma'lumotlari muvaffaqiyatli yangilandi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Ma'lumot o'zgartirildi
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 661fc7a8ef28f317e4e12bba
 *                     fullName:
 *                       type: string
 *                       example: Jasur Qodirov
 *                     dateOfBirth:
 *                       type: string
 *                       example: 1995-01-01
 *                     address:
 *                       type: string
 *                       example: Samarqand
 *                     bio:
 *                       type: string
 *                       example: Men kitob o'qishga qiziqaman...
 *       400:
 *         description: Xatolik yuz berdi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Malumotlar to‘liq kiritilmadi
 *       404:
 *         description: A'zo topilmadi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: A'zo topilmadi!
 */
membersRouter.put("/update_member/:id",updateMember)
/**
 * @swagger
 * /delete_member/{id}:
 *   delete:
 *     summary: A'zoni o'chirish
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: O'chiriladigan a'zoning ID'si
 *     responses:
 *       200:
 *         description: A'zo muvaffaqiyatli o'chirildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: A'zo o'chirildi
 *       404:
 *         description: A'zo topilmadi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: A'zo topilmadi!
 *       400:
 *         description: Xatolik yuz berdi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Noto'g'ri so'rov
 */
membersRouter.delete("/delete_member/:id",deleteMember)
module.exports = membersRouter