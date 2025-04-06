const { client, connectDB } = require("../config/config.db");
const { ObjectId } = require("mongodb");

const database = client.db("library");
const authorsCollection = database.collection("authors");

///     GET AUTHOR      ///
const getAuthors = async (req, res) => {
  try {
    const authors = await authorsCollection.find().toArray();
    return res.status(200).json(authors);
  } catch (error) {
    return res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

///     GET ONE AUTHOR      ///
const getOneAuthor = async (req, res) => {
  try {
    const authorId = new ObjectId(req.params.id);
    const foundedAuthor = await authorsCollection.findOne({ _id: authorId });
    if (!foundedAuthor) {
      return res.status(404).json({
        message: `${authorId} li muallif topilmadi`,
      });
    }
    res.status(200).json(foundedAuthor);
  } catch (error) {
    return res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

///     ADD AUTHOR      ///
const addAuthor = async (req, res) => {
  try {
    const newAuthor = await authorsCollection.insertOne(req.body);
    res.status(200).json(newAuthor);
  } catch (error) {
    return res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

///     UPDATE AUTHOR       ///
const updateAuthor = async (req, res) => {
  try {
    const authorId = new ObjectId(req.params.id);
    const foundedAuthor = await authorsCollection.findOne({ _id: authorId });
    if (!foundedAuthor) {
      return res.status(404).json({
        message: `${authorId} li muallif topilmadi`,
      });
    }
    await authorsCollection.updateOne({ _id: authorId }, { $set: req.body });
    res.status(200).json({
      message: "Ma`lumotlar yangilandi",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

///     DELETE AUTHOR      ///
const deleteAuthor = async (req,res) => {
    try {
        const authorId = new ObjectId(req.params.id);
        const foundedAuthor = await authorsCollection.findOne({ _id: authorId });
        if (!foundedAuthor) {
          return res.status(404).json({
            message: `${authorId} li muallif topilmadi`,
          });
        }
        await authorsCollection.deleteOne({_id:authorId})
        res.status(200).json({
            messsage:`${authorId} li muallif ochirildi ! `
        });
      } catch (error) {
        return res.status(500).json({
          message: "Server xatosi",
          error: error.message,
        });
      }
}

module.exports = {
  getAuthors,
  getOneAuthor,
  addAuthor,
  updateAuthor,
  deleteAuthor
};
