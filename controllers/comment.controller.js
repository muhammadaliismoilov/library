// const BaseError = require("../Utils/base.error")
// const membersModels = require("../Schema/members.schema")
// const booksModels = require("../Schema/books.schema")
// const commentModels = require("../Schema/comment.schema")
// const { message } = require("statuses")

// ///         BOOK COMMENT            ///
// const bookComment = async (req,res,next) =>{
//     try {
//         const {comment,bookId} = req.body
//     const foundBook = await booksModels.findById(bookId)
//     // const foundMember = await membersModels.findById(req.params.id)
//     if (!foundBook) {
//         return next(BaseError.BadRequest(404,"Kitob topilmadi!"))
//     }
//     await booksModels.create({
//         comment,
//         book : bookId 
//         // member :foundMember
//     })
//     res.status(200).json({
//         message:"Comment yozildi"
//     })
//     } catch (error) {
//         return next(error)
//     }

// }

// module.exports=bookComment