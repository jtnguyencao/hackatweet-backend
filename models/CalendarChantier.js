const mongoose = require('mongoose')
const calendarChantierSchema = mongoose.Schema(
    {
        chantierId: {
            type: String,
            required: [true, 'calendar Chantier must have chantierId'],
        },
        name: {
            type: String,
            required: [true, 'Site must have name'],
            trim: true,
        },
        contact: {
            type: String,
            trim: true,
        },
        address: {
            type: String,
            trim: true,
        },
        status: {
            type: Number,
        },
        additionalImages: [String],
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
        assignees: [
            {
                id: { type: String },
                name: { type: String },
                image: { type: String, default: null },
            }
        ],
        urgence: {
            type: Number,
        },
    }
)
module.exports = mongoose.model('calendarChantier', calendarChantierSchema)
