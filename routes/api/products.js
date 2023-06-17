import express from 'express'
import { productsController } from '../../controllers/productsController.js'
import { ctrlWrapper } from '../../helpers/ctrlWrapper.js'

export const productsRouter = express.Router()

productsRouter.get('/', ctrlWrapper(productsController.getAll) )
productsRouter.get('/:id', ctrlWrapper(productsController.getById) )
productsRouter.post('/', ctrlWrapper(productsController.addProduct) )
productsRouter.delete('/:id', ctrlWrapper(productsController.deleteById) )
// router.get('/:category', ctrlWrapper(productsController.getAllByType) )