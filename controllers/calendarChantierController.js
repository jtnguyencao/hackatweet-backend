const CalendarChantier = require("../models/CalendarChantier.js")

// GET
exports.fetchAllEvents = async (req, res) => {
    const { minDate, maxDate } = req.query
    const chantierId = req.params.chantierId
    if (!chantierId) {
        return res.status(400).json({
            status: 'fail',
            message: 'chantierId is required'
        })
    }

    try {
        const query = {
            chantierId: chantierId,
            $or: [
                { startDate: { $gte: new Date(minDate), $lte: new Date(maxDate) } },
                { endDate: { $gte: new Date(minDate), $lte: new Date(maxDate) } },
                { startDate: { $lte: new Date(minDate) }, endDate: { $gte: new Date(maxDate) } }
            ]
        }

        const events = await CalendarChantier.find(query)

        res.status(200).json({
            events,
            totalNumber: events.length
        })
    } catch (err) {
        console.error('Error fetching events:', err)
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}

// POST
exports.createEvent = async (req, res) => {
    try {
        const newEvent = await CalendarChantier.create(req.body)
        res.status(201).json({
            status: 'success',
            data: {
                calendarEvent: newEvent,
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

exports.deleteEvent = async (req, res) => {
    try {
        await CalendarChantier.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: 'success',
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

exports.updateEvent = async (req, res) => {
    try {
        const calendarEvent = await CalendarChantier.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: 'success',
            data: {
                calendarEvent
            }
        })
    } catch (err) {
        console.error('Error updating event:', err)
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}
