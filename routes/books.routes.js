const {Router} = require("express")
const { getBooks, addBook, updateBook, deleteBook, getOneBook, searchBooks } = require("../controllers/books.controller")
const validateBooks = require("../Middleware/books.middleware")
const chekAdmin = require("../Middleware/access_token_middleware")

const booksRouter = Router()

/**
 * @swagger
 * /get_books:
 *   get:
 *     summary: Barcha kitoblarni olish
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Barcha kitoblar ro‘yxati
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 662215baba0fe4d2a80123ef
 *                   title:
 *                     type: string
 *                     example: O‘tkan kunlar
 *                   description:
 *                     type: string
 *                     example: Bu roman o‘zbek adabiyoti tarixidagi ilk realizm asaridir...
 *                   author:
 *                     type: string
 *                     example: 661f8c5bca18349b34321a8f
 *                   genre:
 *                     type: string
 *                     example: Roman
 *                   year:
 *                     type: integer
 *                     example: 1925
 *       404:
 *         description: Kitoblar topilmadi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Kitoblar topilmadi!
 */
booksRouter.get("/get_books",getBooks)
/**
 * @swagger
 * /get_one_book/{id}:
 *   get:
 *     summary: Kitobni ID bo‘yicha olish
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Kitobning ID raqami
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Topilgan kitob ma’lumotlari
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 662215baba0fe4d2a80123ef
 *                 title:
 *                   type: string
 *                   example: O‘tkan kunlar
 *                 description:
 *                   type: string
 *                   example: Bu roman o‘zbek adabiyoti tarixidagi ilk realizm asaridir...
 *                 author:
 *                   type: string
 *                   example: 661f8c5bca18349b34321a8f
 *                 genre:
 *                   type: string
 *                   example: Roman
 *                 year:
 *                   type: integer
 *                   example: 1925
 *       404:
 *         description: Kitob topilmadi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Kitob topilmadi!
 */
booksRouter.get("/get_one_book/:id",getOneBook)
/**
 * @swagger
 * /search_books:
 *   get:
 *     summary: Kitoblarni sarlavha yoki muallif bo‘yicha qidirish
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         required: false
 *         description: Kitob sarlavhasi bo‘yicha qidiruv
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         required: false
 *         description: Muallif ismi bo‘yicha qidiruv (string bo‘lsa ham, author id emas)
 *     responses:
 *       200:
 *         description: Qidiruv bo‘yicha topilgan kitoblar
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 662215baba0fe4d2a80123ef
 *                   title:
 *                     type: string
 *                     example: O‘tkan kunlar
 *                   author:
 *                     type: string
 *                     example: Abdulla Qodiriy
 *                   genre:
 *                     type: string
 *                     example: Roman
 *                   year:
 *                     type: integer
 *                     example: 1925
 */
booksRouter.get("/search_books",searchBooks)
/**
 * @swagger
 * /add_book:
 *   post:
 *     summary: Yangi kitob qo‘shish
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - pages
 *               - year
 *               - price
 *               - country
 *               - author
 *             properties:
 *               title:
 *                 type: string
 *                 example: O‘tkan kunlar
 *               pages:
 *                 type: integer
 *                 example: 125
 *               year:
 *                 type: integer
 *                 example: 1925
 *               price:
 *                 type: integer
 *                 example: 125000
 *               country:
 *                 type:string
 *                 example: O`zbekiston
 *               author:
 *                 type: string
 *                 example: 661f8c5bca18349b34321a8f
 *               description:
 *                 type: string
 *                 example: Bu roman o‘zbek adabiyoti tarixidagi ilk realizm asaridir...
 *     responses:
 *       201:
 *         description: Yangi kitob muvaffaqiyatli qo‘shildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Yangi kitob qo‘shildi
 *       400:
 *         description: Noto‘g‘ri ma’lumotlar yuborildi
 *       401:
 *         description: Token kiritilmagan yoki noto‘g‘ri
 *       403:
 *         description: Sizda bu amalni bajarishga ruxsat yo‘q
 */
booksRouter.post("/add_book",[chekAdmin,validateBooks],addBook) 
/**
 * @swagger
 * /update_book/{id}:
 *   put:
 *     summary: Kitob ma’lumotlarini yangilash
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Yangilanadigan kitobning ID raqami
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - title
 *               - pages
 *               - year
 *               - price
 *               - author
 *             properties:
 *               title:
 *                 type: string
 *                 example: O‘tkan kunlar
 *               pages:
 *                 type: integer
 *                 example: 125
 *               year:
 *                 type: integer
 *                 example: 1925
 *               price:
 *                 type: integer
 *                 example: 125000
 *               author:
 *                 type: string
 *                 example: 661f8c5bca18349b34321a8f
 *               description:
 *                 type: string
 *                 example: Bu roman o‘zbek adabiyoti tarixidagi ilk realizm asaridir...
 *     responses:
 *       201:
 *         description: Ma’lumotlar o‘zgardi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Ma’lumotlar o‘zgardi
 *       404:
 *         description: Kitob topilmadi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Kitob topilmadi!
 *       401:
 *         description: Token yo‘q yoki noto‘g‘ri
 *       403:
 *         description: Ruxsat etilmagan foydalanuvchi
 */
booksRouter.put("/update_book/:id",chekAdmin,updateBook)
/**
 * @swagger
 * /delete_book/{id}:
 *   delete:
 *     summary: Kitobni o‘chirish
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O‘chiriladigan kitobning ID raqami
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Kitob muvaffaqiyatli o‘chirildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Kitob o‘chirildi
 *       404:
 *         description: Kitob topilmadi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Kitob topilmadi!
 *       401:
 *         description: Token yo‘q yoki noto‘g‘ri
 *       403:
 *         description: Ruxsat etilmagan foydalanuvchi
 */
booksRouter.delete("/delete_book/:id",chekAdmin,deleteBook)
module.exports = booksRouter
