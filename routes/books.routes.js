const { Router } = require("express");
const { getBooks, addBook, updateBook, deleteBook, getOneBook, searchBooks } = require("../controllers/books.controller");
const validateBooks = require("../Middleware/books.middleware");
const checkAdmin = require("../Middleware/access_token_middleware");

const booksRouter = Router();

/**
 * @swagger
 * /get_books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Successfully retrieved all books
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
 *                     example: O'tkan kunlar
 *                   description:
 *                     type: string
 *                     example: Bu roman o'zbek adabiyoti tarixidagi ilk realizm asaridir...
 *                   author:
 *                     type: string
 *                     example: 661f8c5bca18349b34321a8f
 *                     description: Muallifning MongoDB ObjectID si
 *                   genre:
 *                     type: string
 *                     example: Roman
 *                   year:
 *                     type: integer
 *                     example: 1925
 *                   pages:
 *                     type: integer
 *                     example: 125
 *                   price:
 *                     type: number
 *                     example: 125000
 *                   country:
 *                     type: string
 *                     example: O'zbekiston
 *       404:
 *         description: No books found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Kitoblar topilmadi!
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server xatosi
 */
booksRouter.get("/get_books", getBooks);

/**
 * @swagger
 * /get_one_book/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the book to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the book
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
 *                   example: O'tkan kunlar
 *                 description:
 *                   type: string
 *                   example: Bu roman o'zbek adabiyoti tarixidagi ilk realizm asaridir...
 *                 author:
 *                   type: string
 *                   example: 661f8c5bca18349b34321a8f
 *                 genre:
 *                   type: string
 *                   example: Roman
 *                 year:
 *                   type: integer
 *                   example: 1925
 *                 pages:
 *                   type: integer
 *                   example: 125
 *                 price:
 *                   type: number
 *                   example: 125000
 *                 country:
 *                   type: string
 *                   example: O'zbekiston
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Kitob topilmadi!
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server xatosi
 */
booksRouter.get("/get_one_book/:id", getOneBook);

/**
 * @swagger
 * /search_books:
 *   get:
 *     summary: Search books by title or author
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         required: false
 *         description: Search books by title
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         required: false
 *         description: Search books by author name (not author ID)
 *     responses:
 *       200:
 *         description: Successfully retrieved search results
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
 *                     example: O'tkan kunlar
 *                   author:
 *                     type: string
 *                     example: Abdulla Qodiriy
 *                   genre:
 *                     type: string
 *                     example: Roman
 *                   year:
 *                     type: integer
 *                     example: 1925
 *                   pages:
 *                     type: integer
 *                     example: 125
 *                   price:
 *                     type: number
 *                     example: 125000
 *                   country:
 *                     type: string
 *                     example: O'zbekiston
 *       400:
 *         description: Invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Noto‘g‘ri so‘rov parametrlari!
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server xatosi
 */
booksRouter.get("/search_books", searchBooks);

/**
 * @swagger
 * /add_book:
 *   post:
 *     summary: Add a new book
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
 *                 example: O'tkan kunlar
 *               pages:
 *                 type: integer
 *                 example: 125
 *               year:
 *                 type: integer
 *                 example: 1925
 *               price:
 *                 type: number
 *                 example: 125000
 *               country:
 *                 type: string
 *                 example: O'zbekiston
 *               author:
 *                 type: string
 *                 example: Abdulla Qodiriy
 *                 description: Muallifning ismi (string sifatida)
 *               discription:
 *                 type: string
 *                 example: Bu roman o'zbek adabiyoti tarixidagi ilk realizm asaridir...
 *     responses:
 *       201:
 *         description: Book successfully added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Yangi kitob qo'shildi
 *                 book:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 662215baba0fe4d2a80123ef
 *                     title:
 *                       type: string
 *                       example: O'tkan kunlar
 *                     discription:
 *                       type: string
 *                       example: Bu roman o'zbek adabiyoti tarixidagi ilk realizm asaridir...
 *                     author:
 *                       type: string
 *                       example: Abdulla Qodiriy
 *                       description: Muallifning ismi (string sifatida)
 *                     year:
 *                       type: integer
 *                       example: 1925
 *                     pages:
 *                       type: integer
 *                       example: 125
 *                     price:
 *                       type: number
 *                       example: 125000
 *                     country:
 *                       type: string
 *                       example: O'zbekiston
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Noto‘g‘ri ma’lumotlar yuborildi
 *       401:
 *         description: Unauthorized - No token or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token kiritilmagan yoki noto‘g‘ri
 *       403:
 *         description: Forbidden - Insufficient permissions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sizda bu amalni bajarishga ruxsat yo‘q
 *       404:
 *         description: Author not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Muallif topilmadi!
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server xatosi
 */
booksRouter.post("/add_book", [checkAdmin, validateBooks], addBook);

/**
 * @swagger
 * /update_book/{id}:
 *   put:
 *     summary: Update book details
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the book to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: O'tkan kunlar
 *               pages:
 *                 type: integer
 *                 example: 125
 *               year:
 *                 type: integer
 *                 example: 1925
 *               price:
 *                 type: number
 *                 example: 125000
 *               country:
 *                 type: string
 *                 example: O'zbekiston
 *               author:
 *                 type: string
 *                 example: 661f8c5bca18349b34321a8f
 *                 description: Muallifning MongoDB ObjectID si
 *               description:
 *                 type: string
 *                 example: Bu roman o'zbek adabiyoti tarixidagi ilk realizm asaridir...
 *     responses:
 *       200:
 *         description: Book successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Ma’lumotlar o‘zgardi
 *                 book:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 662215baba0fe4d2a80123ef
 *                     title:
 *                       type: string
 *                       example: O'tkan kunlar
 *                     description:
 *                       type: string
 *                       example: Bu roman o'zbek adabiyoti tarixidagi ilk realizm asaridir...
 *                     author:
 *                       type: string
 *                       example: 661f8c5bca18349b34321a8f
 *                     genre:
 *                       type: string
 *                       example: Roman
 *                     year:
 *                       type: integer
 *                       example: 1925
 *                     pages:
 *                       type: integer
 *                       example: 125
 *                     price:
 *                       type: number
 *                       example: 125000
 *                     country:
 *                       type: string
 *                       example: O'zbekiston
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Kitob topilmadi!
 *       401:
 *         description: Unauthorized - No token or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token yo‘q yoki noto‘g‘ri
 *       403:
 *         description: Forbidden - Insufficient permissions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Ruxsat etilmagan foydalanuvchi
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server xatosi
 */
booksRouter.put("/update_book/:id", checkAdmin, updateBook);

/**
 * @swagger
 * /delete_book/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the book to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Kitob o‘chirildi
 *                 deletedBook:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 662215baba0fe4d2a80123ef
 *                     title:
 *                       type: string
 *                       example: O'tkan kunlar
 *                     author:
 *                       type: string
 *                       example: 661f8c5bca18349b34321a8f
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Kitob topilmadi!
 *       401:
 *         description: Unauthorized - No token or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token yo‘q yoki noto‘g‘ri
 *       403:
 *         description: Forbidden - Insufficient permissions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Ruxsat etilmagan foydalanuvchi
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server xatosi
 */
booksRouter.delete("/delete_book/:id", checkAdmin, deleteBook);

module.exports = booksRouter;