const express = require('express')

const calendarEventController = require("../controllers/calendarEventController.js")
const router = express.Router()

router
    .route('/')
    .post(calendarEventController.createEvent)

router
    .route('/room/:chantierId')
    .get(calendarEventController.fetchAllEvents)

router
    .route('/:id')
    .delete(calendarEventController.deleteEvent)
    .post(calendarEventController.updateEvent)

module.exports = router