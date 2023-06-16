import express from "express"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cors from 'cors';
import logger from 'morgan';
import { validationResult } from 'express-validator';
import { registerValidation } from './validations/auth.js';
// import userModel from './models/user.js'
import {router as productsRouter} from './routes/api/products.js'
dotenv.config()



export const app = express()
app.use(express.json())
app.use(cors())

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
app.use(logger(formatsLogger))

app.use('/api/products', productsRouter)

// універсальний обробник помилок
app.use((req, res)=>{
res.status(404).json({message:"Not found"})
})

app.use((err, req, res, next) => {
    const { status = 500, message = 'Server error' } = err
    res.status(status).json({ message })
  })



// app.post('/auth/register', registerValidation, async (req, res) => {
//     try {
//         const errors = validationResult(req)
//         if (!errors.isEmpty()) return res.status(400).json(errors.array())

//         const password = req.body.password
//         const salt = await bcrypt.genSalt(10)
//         const hash = await bcrypt.hash(password, salt)

//         const doc = new userModel({
//             fullName: req.body.fullName,
//             email: req.body.email,
//             avatarUrl: req.body.avatarUrl,
//             passwordHash: hash,
//         })

//         const user = await doc.save()

//         const token = jwt.sign({
//             _id: user._id,
//         }, 'secret123', {
//             expiresIn: '30d',
//         })

//         const { passwordHash, ...userData } = user._doc;

//         res.json({
//             ...userData,
//             token,
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: 'Failed to register'
//         })
//     }
// });

// app.post('/auth/login', async (req, res)=>{
//     try {
//         const user = userModel.findOne({email: req.body.email})
//         if(!user){
//             return res.status(404).json({
//                 message: "User not found"
//             })
//         }
        
//         const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)
     
//         console.log('isValidPass', isValidPass)
//         console.log('passwordHash', user._doc.passwordHash)

// if(!isValidPass){
//     return res.status(400).json({
//         message: "Invalid password or email"
//     })
// }

// const token = jwt.sign({
//     _id: user._id,
// }, 'secret123', {
//     expiresIn: '30d',
// })

// const { passwordHash, ...userData } = user._doc;

// res.json({
//     ...userData,
//     token,
// });

//     } catch (error) {
//         res.status(500).json({
//             message: 'Login failed'
//         }) 
//     }
// })

