const authorModels = require("../Schema/authors.schema");
const booksModels = require("../Schema/books.schema");
const BaseError = require("../Utils/base.error")



///     GET AUTHOR      ///
const getAuthors = async (req, res,next) => {
  try {
    const foundAuthors = await authorModels.find();
    if (foundAuthors.length === 0) {
     return next(BaseError.BadRequest(404,"Muallif topilmadi!"))
    }
    return res.status(201).json(foundAuthors);
  } catch (error) {
    next(error)
  }
};

///     GET ONE AUTHOR      ///
const getOneAuthor = async (req, res,next) => {
  try {
    const foundedAuthor = await authorModels.findById(req.params.id);
    if (!foundedAuthor) {
      return res.status(404).json({
        message: `Muallif topilmadi`,
      });
    }
    const foundedBook = await booksModels.find({author:req.params.id})
    res.status(200).json({author: foundedAuthor, authorBooks : foundedBook});
  } catch (error) {
    next(error)
  }
};

///     SEARCH AUTHOR   ///
const searchAuthors = async (req,res,next) => {
  try {
    if (req.query.fullName ) {
      const result = await authorModels.find({
        fullName :{$regex :req.query.fullName,$options:"i"}
      })
      return res.json(result)
    }
  } catch (error) {
    next(error)
  }
}

///     ADD AUTHOR      ///
const addAuthor = async (req, res,next) => {
  try {
    await authorModels.create(req.body);
    res.status(201).json({
      message: "Yangi Muallif qoshildi",
    });
  } catch (error) {
    next(error)
  }
};

///     UPDATE AUTHOR       ///
const updateAuthor = async (req, res,next) => {
  try {
    const foundedAuthor = await authorModels.findById(req.params.id);
    if (!foundedAuthor) {
      return res.status(404).json({
        message: `Muallif topilmadi`,
      });
    }
    await authorModels.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      message: "Ma`lumotlar yangilandi",
    });
  } catch (error) {
    next(error)
  }
};

///     DELETE AUTHOR      ///
const deleteAuthor = async (req, res,next) => {
  try {
    const foundedAuthor = await authorModels.findById(req.params.id)
    if(!foundedAuthor) {
      return res.status(404).json({
        message: `Muallif topilmadi`,
      });
    }
    await authorModels.findByIdAndDelete(req.params.id)
    res.status(200).json({
      messsage: `Muallif ochirildi ! `,
    });
  } catch (error) {
    next(error)
  }
};

module.exports = {
  getAuthors,
  getOneAuthor,
  searchAuthors,
  addAuthor,
  updateAuthor,
  deleteAuthor,
};
