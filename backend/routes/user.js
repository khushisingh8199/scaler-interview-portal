const express = require('express')
const usercontrollers = require('../controllers/user')
const router =  express.Router()

router.route('/admins')
.get(usercontrollers.getadmins)

router.route('/participants')
.get(usercontrollers.getparticipants)

module.exports = router;



