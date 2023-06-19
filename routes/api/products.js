import express from 'express'
import { productsController } from '../../controllers/productsController.js'
import { ctrlWrapper } from '../../helpers/ctrlWrapper.js'
import { auth } from '../../middlewares/auth.js'

export const productsRouter = express.Router()

productsRouter.get('/', auth, ctrlWrapper(productsController.getAll) )
productsRouter.get('/:id', ctrlWrapper(productsController.getById) )
productsRouter.post('/', auth, ctrlWrapper(productsController.addProduct) )
productsRouter.delete('/:id', ctrlWrapper(productsController.deleteById) )
