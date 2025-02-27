const mongoose = require('mongoose')
const calendarChantierSchema = mongoose.Schema(
    {
        chantierId: {
            type: String,
            required: [true, 'calendar Chantier must have chantierId'],
        },
        name: {
            type: String,
            unique: true,
            required: [true, 'Site must have name'],
            trim: true,
        },
        contact: {
            type: String,
            trim: true,
            required: [true, 'Site must have contact']
        },
        address: {
            type: String,
            trim: true,
            required: [true, 'Site must have address']
        },
        status: {
            type: Number,
            required: [true, 'calendar Chantier must have status'],
        },
        note: {
            type: String,
            trim: true,
        },
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
module.exports = mongoose.model('calendarChantier', calendarChantierSchema)
