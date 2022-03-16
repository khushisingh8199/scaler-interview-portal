const mongoose = require('mongoose')

const interviewSchema = new mongoose.Schema({
    date: 
    {
        type: Date,
        required: true,
    },

    starttime:
    {
        type: Date,
        required: true,
    },

    endtime:{

        type: Date,
        required: true,

    },

    admins:{
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ]

    },

    participants:{
        type:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    }


});

module.exports = mongoose.model('Interview', interviewSchema)

