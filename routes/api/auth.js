import express from 'express'
import { ctrlWrapper } from '../../helpers/ctrlWrapper.js'
import { authController } from '../../controllers/authController.js'
import { auth } from '../../middlewares/auth.js'

export const authRouter = express.Router()

authRouter.post('/register', ctrlWrapper(authController.register))
authRouter.post('/login', ctrlWrapper(authController.login))
authRouter.post('/logout', auth, ctrlWrapper(authController.logout))