const Interview = require('../models/interview')

module.exports.getAllInterviews = async (req , res , next ) => {
    try{
        const allinterviews = await Interview.find({}).populate('admins').populate('participants')
        return res.json(allinterviews)

    }

    catch(e){
        console.log(e)
        return next(e)
    }
}

// Schedule new Interviews 
module.exports.createNewInterviews = async (req, res, next) =>{
    const {date,starttime,endtime,admins,participants}= req.body;
    try{
        const newInterview = new Interview({date,starttime,endtime,admins,participants})
        const interview = await newInterview.save()
        return res.json(interview)
        
    }
    catch(e){
        console.log(e)
        return next(e)
    } 
}
//Fetching Single Interview Details
module.exports.getInterviewByID = async(req,res,next) =>{
    const {id} = req.params
    try{
        const interviewID = await Interview.findById(id)
        return res.json(interviewID)
    }

    catch(e){
        console.log(e)
        return next(e)
    }
}

//Editing of interviews

module.exports.editInterviews = async(req,res,next) =>{
    const {id} = req.params
    const {date,starttime,endtime,admins,participants}= req.body;
    
    try{
        const editedInterview = await Interview.findByIdAndUpdate(id, {date,starttime,endtime,admins,participants})
        return res.json(editedInterview)

    }
    catch(e){
        console.log(e)
        return next(e)
    }
}
