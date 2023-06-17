import { validationResult } from 'express-validator';
// import { registerValidation } from './validations/auth.js';
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { RequestError } from '../helpers/RequestError.js';



const register = async (req, res, next) => {
    const {email, name, password} = req.body
    const existingUser = await User.findOne({email})

if(existingUser){
    throw RequestError(409, `User with email: ${email} already exists`)
}

const hashedPassword = await bcrypt.hash(password, 10)
   const user = await User.create({email, name, password: hashedPassword})

   res.status(201).json({
    name: user.name,
    email: user.email
   })
};

const login = async (req, res, next) => {
        const {email, password} = req.body
        const existingUser = await User.findOne({email})
        
        if(!existingUser){
            throw RequestError(401, `Invalid email or password`)
        }
        
        const isPasswordValid = await bcrypt.compare(password, existingUser.password)

        if(!isPasswordValid){
            throw RequestError(401, `Invalid email or password`)
        }

        const token = 'hgghcfg.hgbhvhgfvgf.hbjvbghvgfh'

        res.json({
            token
        })
};

export const authController = {
    register,
    login
}