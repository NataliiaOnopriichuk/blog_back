import express from 'express'
import { productsController } from '../../controllers/productsController.js'
import { auth } from '../../middlewares/auth.js'
import { productValidation } from '../../validations/products.js'
import { ctrlWrapper, ValidationErrors } from '../../helpers/index.js'
import { upload } from '../../middlewares/upload.js'
  

export const productsRouter = express.Router()

productsRouter.get('/', ctrlWrapper(productsController.getAll) )
productsRouter.get('/:id', ctrlWrapper(productsController.getById) )
productsRouter.post('/', auth, productValidation, ValidationErrors, ctrlWrapper(productsController.addProduct) )
productsRouter.put('/:id', auth, productValidation, ValidationErrors, ctrlWrapper(productsController.updateById) )
productsRouter.delete('/:id', ctrlWrapper(productsController.deleteById) )
productsRouter.patch('/:id/upload', auth, upload.single('image'), ctrlWrapper(productsController.upload));

