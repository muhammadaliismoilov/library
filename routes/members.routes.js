const Router = require("express")
const { getMembers, getOneMember, searchMembers, updateMember, deleteMember, addMember } = require("../controllers/members.controller")
const validateMembers = require("../Middleware/members.validator")
const { checkAdmin } = require("../Middleware/access_token_middleware")

const membersRouter = Router()

membersRouter.get("/get_members",getMembers)
membersRouter.get("/get_one_member/:id",getOneMember)
membersRouter.get("/search_member",searchMembers)
membersRouter.post("/add_member",[checkAdmin,validateMembers],addMember)
membersRouter.put("/update_member/:id",updateMember)
membersRouter.delete("/delete_member/:id",checkAdmin,deleteMember)

module.exports = membersRouter