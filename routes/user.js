const express = require('express')

const User = require("../models/User.js")
const router = express.Router()
const JWT_SECRET = 'Jamesboy'
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {body,validationResult} = require('express-validator')

//signup
router.post('/adduser',[
    body('name','Enter a valid name').isLength({min:3}),
    body('password', 'Password should have atleast 6 characters').isLength({ min: 6 }),
    
],async (req,res)=>{
    let answer = 0
    let success  = false
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        answer=1
        return res.status(400).json({answer,success,errors:errors.array()})
    }
    try{
    /*if(user){
        answer = 2
        return res.status(400).json({answer,success,error:"sorry user with this name exits"})
    }*/
    const salt = bcrypt.genSaltSync(10)
    const securedPassword = bcrypt.hashSync(req.body.password, salt)
    let user = await User.create({
        name:req.body.name,
        password:securedPassword}
    )
    const data ={
        user:{
            id:user.id
        }
    } 
    var token = jwt.sign(data, JWT_SECRET)
    success = true
    res.send({answer,success,token})
    }
    catch(err){
        return res.status(500).json({error:err})
    }
}) 

//login
router.post("/loginuser", [
    body('password', 'Password should have atleast 6 characters').isLength({ min: 6 }),
], async (request, response) => {
    let success = false
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        return response.status(400).json({success,error: errors.array() })
    }
    const { name, password } = request.body
    try {
        let user = await User.findOne({ name })
        if (!user) {
            return response.status(400).json({success, error: "You entered wrong password or name" })
        }
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return response.status(400).json({success, error: "You entered wrong password or name" })
        }
        const data = {
            user: {
                id: user.id,
                name: user.name
            }
        }
        var token = jwt.sign(data, JWT_SECRET)
        success = true
        console.log(token)
        response.send({success, token })
    } catch (error) {
        response.status(500).send(error)
    } 
})

//modify
router.post("/modify", [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('oldPassword', 'Password should have atleast 6 characters').isLength({min: 6}),
    body('newPassword', 'Password should have atleast 6 characters').isLength({min: 6}),
], async (request, response) => {
    let success = false
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        return response.status(400).json({ success, error: errors.array() })
    }
    const { name, oldPassword, newPassword } = request.body
    try {
        let user = await User.findOne({ name })
        if (user) {
            if (oldPassword ==="EmptyString" && newPassword === ("EmptyString")){
                user.name = name
            }
            else{
                const match = await bcrypt.compare(oldPassword, user.password)
                if (!match) {
                    return response.status(400).json({success, error: "You entered wrong password" })
                }
                const salt = bcrypt.genSaltSync(10)
                const securedPassword = bcrypt.hashSync(newPassword, salt)
                user.password = securedPassword
            }
            await user.save()
            var token = jwt.sign({ user: { id: user.id, name: user.name, password: user.password } }, JWT_SECRET)
            success = true
            response.send({ success, token })
        } else {
            response.status(404).send({ success, message: "User not found" })
        }
    } catch (error) {
        response.status(500).send(error)
    }
})

module.exports = router