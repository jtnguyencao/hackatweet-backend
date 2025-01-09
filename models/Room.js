const mongoose = require('mongoose')
const roomSchema = mongoose.Schema(
    {
        applicationId: {
            type: String,
            required: [true, 'Site must have applicationId'],
        },
        name: {
            type: String,
            unique: true,
            required: [true, 'Site must have name'],
            trim: true,
        },
        status: {
            type: Number,
            required: [true, 'Site must have status'],
            default: 0
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
        longitude: {
            type: Number,
        },
        latitude: {
            type: Number,
        },
        description: {
            type: String,
            trim: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
    }
)
module.exports = mongoose.model('room',roomSchema)