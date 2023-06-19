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


