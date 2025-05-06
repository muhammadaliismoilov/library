const {Router} = require("express")
const { getAuthors, addAuthor, updateAuthor, getOneAuthor, deleteAuthor, searchAuthors } = require("../controllers/author.controller")
const validateAuthors = require("../Middleware/authors.middleware")
const chekAdmin = require("../Middleware/access_token_middleware")

const authorsRouter = Router()
/**
 * @swagger
 * /get_authors:
 *   get:
 *     summary: Barcha mualliflarni olish
 *     tags: [Authors]
 *     responses:
 *       201:
 *         description: Mualliflar ro'yxati muvaffaqiyatli qaytarildi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 661f885b124ef2f2d8123456
 *                   fullName:
 *                     type: string
 *                     example: Islom Karimov
 *                   birthDate:
 *                     type: string
 *                     example: 1938-01-30
 *                   bio:
 *                     type: string
 *                     example: O'zbekistonning birinchi Prezidenti...
 *       404:
 *         description: Hech qanday muallif topilmadi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Muallif topilmadi!
 */
authorsRouter.get("/get_authors",getAuthors)
/**
 * @swagger
 * /get_one_author/{id}:
 *   get:
 *     summary: Muallif va uning kitoblarini olish
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Muallifning ID raqami
 *     responses:
 *       200:
 *         description: Muallif va uning kitoblari qaytarildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 author:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 6621f9f8bcfe6e3bb0123456
 *                     fullName:
 *                       type: string
 *                       example: Abdulla Qodiriy
 *                     birthDate:
 *                       type: string
 *                       example: 1894-04-29
 *                     bio:
 *                       type: string
 *                       example: Mashhur o‘zbek yozuvchisi...
 *                 authorBooks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 6621fa20bcfe6e3bb0765432
 *                       title:
 *                         type: string
 *                         example: O‘tkan kunlar
 *                       publishedYear:
 *                         type: number
 *                         example: 1925
 *                       genre:
 *                         type: string
 *                         example: Roman
 *       404:
 *         description: Muallif topilmadi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Muallif topilmadi!
 */
authorsRouter.get("/get_one_author/:id",getOneAuthor)
/**
 * @swagger
 * /search_authors:
 *   get:
 *     summary: Mualliflarni ism bo‘yicha qidirish
 *     tags: [Authors]
 *     parameters:
 *       - in: query
 *         name: fullName
 *         schema:
 *           type: string
 *         required: true
 *         description: Qidirilayotgan muallif ismi (to‘liq yoki qisman)
 *         example: abdulla
 *     responses:
 *       200:
 *         description: Muvofiq mualliflar ro‘yxati
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 6621fb65bcfe6e3bb0123333
 *                   fullName:
 *                     type: string
 *                     example: Abdulla Qodiriy
 *                   birthDate:
 *                     type: string
 *                     example: 1894-04-29
 *                   bio:
 *                     type: string
 *                     example: O‘zbek adabiyoti asoschilaridan biri...
 *       500:
 *         description: Serverda xatolik yuz berdi
 */
authorsRouter.get("/search_authors",searchAuthors)
/**
 * @swagger
 * /add_author:
 *   post:
 *     summary: Yangi muallif qo‘shish
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - dateOfBirth
 *               - dateOfDeath
 *               - country
 *               - bio
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Erkin Vohidov
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 example: 1936-12-28
 *               dateOfDeath:
 *                 type: string
 *                 format: date
 *                 example: 2016-05-30
 *               country:
 *                 type: string
 *                 example: O'zbekiston
 *               bio:
 *                 type: string
 *                 example: O‘zbek shoiri, dramaturg va jamoat arbobi...
 *     responses:
 *       201:
 *         description: Yangi muallif qo‘shildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Yangi Muallif qo‘shildi
 *       400:
 *         description: Noto‘g‘ri so‘rov (valiadatsiya xatosi yoki to‘liq bo‘lmagan ma’lumot)
 *       401:
 *         description: Token kiritilmagan yoki noto‘g‘ri
 *       403:
 *         description: Sizda bu amalni bajarishga ruxsat yo‘q
 */
authorsRouter.post("/add_author", [chekAdmin, validateAuthors], addAuthor);
/**
 * @swagger
 * /update_author/{id}:
 *   put:
 *     summary: Muallif ma’lumotlarini yangilash
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Yangilanadigan muallifning ID raqami
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Abdulla Qodiriy
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 example: 1894-04-29
 *               dateOfDeath:
 *                 type: string
 *                 example: 1894-04-29
 *               country:
 *                 type: string
 *                 example: O‘zbekiston
 *               bio:
 *                 type: string
 *                 example: Mashhur o‘zbek yozuvchisi, "O‘tkan kunlar" asari muallifi
 *     responses:
 *       200:
 *         description: Ma’lumotlar muvaffaqiyatli yangilandi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Ma`lumotlar yangilandi
 *       404:
 *         description: Muallif topilmadi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Muallif topilmadi!
 */
authorsRouter.put("/update_author/:id",chekAdmin,updateAuthor)
/**
 * @swagger
 * /delete_author/{id}:
 *   delete:
 *     summary: Muallifni o‘chirish
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O‘chiriladigan muallifning ID raqami
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Muallif muvaffaqiyatli o‘chirildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 messsage:
 *                   type: string
 *                   example: Muallif ochirildi !
 *       404:
 *         description: Muallif topilmadi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Muallif topilmadi!
 */
authorsRouter.delete("/delete_author/:id",chekAdmin,deleteAuthor)
module.exports = authorsRouter