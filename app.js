import express from "express"
import dotenv from 'dotenv';
import cors from 'cors';
import logger from 'morgan';
import {productsRouter} from './routes/api/products.js'
import { authRouter } from "./routes/api/auth.js";
dotenv.config()



export const app = express()
app.use(express.json())
app.use(cors())

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
app.use(logger(formatsLogger))

app.use('/api/products', productsRouter)
app.use('/api/auth', authRouter)

// універсальний обробник помилок
app.use((req, res)=>{
res.status(404).json({message:"Not found"})
})

app.use((err, req, res, next) => {
    const { status = 500, message = 'Server error' } = err
    res.status(status).json({ message })
  })





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

