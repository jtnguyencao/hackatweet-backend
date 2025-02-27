const express = require('express')

const calendarChantierController = require("../controllers/calendarChantierController.js")
const router = express.Router()

router
    .route('/')
    .post(calendarChantierController.createEvent)

router
    .route('/room/:chantierId')
    .get(calendarChantierController.fetchAllEvents)

router
    .route('/:id')
    .delete(calendarChantierController.deleteEvent)
    .post(calendarChantierController.updateEvent)

module.exports = router