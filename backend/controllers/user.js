const User = require('../models/user')

module.exports.getadmins = async (req,res,next) => {
    try{
        const admins = await User.find({userType: 'Admin'})
        return res.json(admins)
    }
    catch(e){
        console.log(e)
        return next(e)

    }
}
 module.exports.getparticipants = async (req,res,next) => {
     try{
         const participants  = await User.find({userType:'Participant' })
         return res.json(participants)
     }
     catch (e){
         console.log(e)
         return next(e)
     }
 }
