const express = require('express')
const router = express.Router()
const middlewares = require('../middlewares/interview')


const controller = require('../controllers/interview')

router.route('/')
.get(controller.getAllInterviews)
.post(middlewares.validateParticipantCount, middlewares.validateParticipantAvailability , controller.createNewInterviews)

router.route('/:id')
.get(controller.getInterviewByID)
.patch(middlewares.validateParticipantCount , middlewares.validateParticipantAvailability , controller.editInterviews)

module.exports = router;