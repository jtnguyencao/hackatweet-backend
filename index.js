const connectToMongo = require("./db")
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())
app.use('/auth/user',require("./routes/user"))
app.use('/room',require("./routes/room"))
app.use('/event',require("./routes/calendarEvent"))
app.use('/eventChantier',require("./routes/calendarChantier"))
app.get('/',(req,res)=>{
    res.send("hello")
})
app.listen(process.env.PORT)
connectToMongo