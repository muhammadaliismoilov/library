const BaseError = require("../Utils/base.error")
const membersModels = require("../Schema/members.schema")

///         GET MEMBER          ///
const getMembers = async (req,res,next) =>{
    try {
        const foundedMembers = await membersModels.find()
        res.status(200).json(foundedMembers)
    } catch (error) {
        next(error )
    }
}

//          GET ONE MEMBER      ///
const getOneMember = async (req,res,next) => {
    try {
        const foundedMembers = await membersModels.findById(req.params.id)
        if (!foundedMembers) {
            return next(BaseError.BadRequest(404,"Muallif topilmadi!"))
        }
        res.status(200).json(foundedMembers)
    } catch (error) {
        next(error)
    }
}

///         SEARCH MEMBERS      ////
const searchMembers = async (req,res,next) => {
    try {
      if (req.query.fullName ) {
        const result = await membersModels.find({
          fullName :{$regex :req.query.fullName,$options:"i"}
        })
        return res.json(result)
      }
    } catch (error) {
      next(error)
    }
}

///         ADD MEMBERS         ///
const addMember = async (req,res,next) => {
    try {
        await membersModels.create(req.body)
        res.status(200).json({
            message:"Azo qo`shildi"
        })
    } catch (error) {
        next(error)
    }
}

///         UPDATE MEMBER           ///
const updateMember = async (req,res,next) => {
    try {
        const foundedMember = await membersModels.findById(req.params.id)
        if (!foundedMember) {
            return next(BaseError.BadRequest(404,"A`zo topilmadi!"))
        }
        await membersModels.findByIdAndUpdate(req.params.id , req.body)
        res.status(200).json({
            message:"Malumot o`zgartirildi"
        })
    } catch (error) {
        next(error)
    }
}

///         DELETE MEMBERS          ///
const deleteMember = async (req,res,next) => {
    try {
        const foundedMember = await membersModels.findById(req.params.id)
        if (!foundedMember) {
            return next(BaseError.BadRequest(404,"A`zo topilmadi!"))
        }
        await membersModels.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message:"Malumot o`zgartirildi"
        })
    } catch (error) {
        next(error)
    }
}

module.exports ={
    getMembers,
    getOneMember,
    searchMembers,
    addMember,
    updateMember,
    deleteMember
}