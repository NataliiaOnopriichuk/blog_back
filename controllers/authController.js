import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { RequestError } from "../helpers/index.js";


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

        const payload = {
            id: existingUser._id
        }


        const {TOKEN_KEY} = process.env

        const token = jwt.sign(payload, TOKEN_KEY, {expiresIn: "30d"})

        await User.findByIdAndUpdate(existingUser._id, {token})

        res.json({
            token
        })
};

const logout = async(req, res, json) => {
const {_id} = req.user
await User.findByIdAndUpdate(_id, {token: ''})

res.json({
    message: 'Logout successful'
})
}

export const authController = {
    register,
    login,
    logout
}