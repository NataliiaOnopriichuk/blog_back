import jwt from 'jsonwebtoken';
import { User } from "../models/User.js";
import { RequestError } from '../helpers/index.js';


export const auth = async (req, res, next) => {
    try {
        const {authorization = ''} = req.headers
        const [bearer, token] = authorization.split(' ')
        if(bearer !== "Bearer"){
            throw RequestError(401, 'Not authorized')
        }
        try {
            const {TOKEN_KEY} = process.env
            const {id} = jwt.verify(token, TOKEN_KEY)
            const user = await User.findById(id)
            if(!user || !user.token){
                throw RequestError(401, 'Not authorized')
            }
            req.user = user
            next()
        } catch (error) {
            throw RequestError(401, 'Not authorized')
        }
    } catch (error) {
        next(error)
    }
}