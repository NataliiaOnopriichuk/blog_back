import express from "express"
import bcrypt from "bcrypt"
import mongoose from "mongoose"
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

import { registerValidation } from './validations/auth.js';
import userModel from './models/User.js'

mongoose.connect('mongodb+srv://nataliam110388:Nata_1988@cluster0.djzkzyz.mongodb.net/GroceryList').then(() => console.log('DB ok')).catch((err) => console.log('DB error', err))

const app = express()
app.use(express.json())

app.post('/auth/register', registerValidation, async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).json(errors.array())

        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const doc = new userModel({
            fullName: req.body.fullName,
            email: req.body.email,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        })

        const user = await doc.save()

        const token = jwt.sign({
            _id: user._id,
        }, 'secret123', {
            expiresIn: '30d',
        })

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to register'
        })
    }
});

app.post('/auth/login', async (req, res)=>{
    try {
        const user = userModel.findOne({email: req.body.email})
        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }
        
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)
     
        console.log('isValidPass', isValidPass)
        console.log('passwordHash', user._doc.passwordHash)

if(!isValidPass){
    return res.status(400).json({
        message: "Invalid password or email"
    })
}

const token = jwt.sign({
    _id: user._id,
}, 'secret123', {
    expiresIn: '30d',
})

const { passwordHash, ...userData } = user._doc;

res.json({
    ...userData,
    token,
});

    } catch (error) {
        res.status(500).json({
            message: 'Login failed'
        }) 
    }
})

app.listen(3000, (err) => {
    if (err) return console.log(err);
    return console.log('Server OK');
})