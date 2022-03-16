const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    username:{
        type: String,
        required: true,
        unique: true
    },

    name:{
        type: String,
        required: true

    },

    email:{
        type: String,
        unique: true,
        validate: [emailvalidation]

    },
    userType:{
        type: String,
        required: true,
        enum: ['Admin', 'Participant']

    }

});
function emailvalidation(email){
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return re.test(email)

}

module.exports = mongoose.model('User', userSchema)
