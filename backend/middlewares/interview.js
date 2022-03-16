const Interview = require('../models/interview')
const CustomError = require('../CustomError')
//a1 user req particpants
//a2 each overlapping interviews each entry 
function SameParticipants(a1,a2){
return a1.some(item=>a2.includes(item))
}
module.exports.validateParticipantCount = (req,res,next) =>{
    const {admins, participants}= req.body
    try{
        if (admins.length===0 )
            throw new CustomError('Invalid Number Of Admins!', 400)
        if(participants.length<2)
            throw new CustomError('Participants must be more than 2',400)
        return next()

        }

        catch(e){
            console.log(e)
            return next(e)
        }
}

module.exports.validateParticipantAvailability = async(req,res,next) =>{
    const {date,starttime,endtime,admins,participants} = req.body
    try{
        let clashingInterviews;
        if (req.method == "POST") {
            clashingInterviews = await Interview.find({
                $and: [
                    {date: {$eq: date}},
                    {starttime: {$lte: endtime}},
                    {endtime:{$gte: starttime}}
                ]
            });
        } else if (req.method == "PATCH") {
            const { id } = req.params;
            clashingInterviews = await Interview.find({
                $and: [
                    {_id: {$ne: id}},
                    {date: {$eq: date}},
                    {starttime: {$lte: endtime}},
                    {endtime:{$gte: starttime}}
                ]
            });
        }

        clashingInterviews.forEach((item) => {
            if( SameParticipants (participants,item.participants) || SameParticipants(admins,item.admins))
                throw new CustomError('Participant not avaiable during this schedule' , 400)
            
        })
        return next()

    }
    catch(e){
        console.log(e)
        return next(e)
    }
}