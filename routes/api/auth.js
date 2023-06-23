import express from 'express'
import { authController } from '../../controllers/authController.js'
import { auth } from '../../middlewares/auth.js'
import { loginValidation, registerValidation } from '../../validations/auth.js';
import { ctrlWrapper, ValidationErrors } from '../../helpers/index.js';


export const authRouter = express.Router()

authRouter.post('/register', registerValidation, ValidationErrors,  ctrlWrapper(authController.register))
authRouter.post('/login', loginValidation, ValidationErrors, ctrlWrapper(authController.login))
authRouter.post('/logout', auth, ctrlWrapper(authController.logout))