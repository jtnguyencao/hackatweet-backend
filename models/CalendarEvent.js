const mongoose = require('mongoose')
const calendarEventSchema = mongoose.Schema(
    {
        chantierId: {
            type: String,
            required: [true, 'calendar Event must have chantierId'],
        },
        type: {
            type: Number,
            required: [true, 'calendar Event must have type'],
        },
        note: {
            type: String,
            trim: true,
        },
        /*
        occupants: {
            type: Number,
            default: 0,
        },*/
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        createdDate: {
            type: Date,
            default: Date.now(),
        },
    }
)
module.exports = mongoose.model('calendarEvent', calendarEventSchema)
