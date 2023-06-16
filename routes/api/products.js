import express from 'express'
import { productsController } from '../../controllers/productsController.js'
import { ctrlWrapper } from '../../helpers/ctrlWrapper.js'

export const router = express.Router()

router.get('/', ctrlWrapper(productsController.getAll) )
router.get('/:id', ctrlWrapper(productsController.getById) )
router.post('/', ctrlWrapper(productsController.addProduct) )
router.delete('/:id', ctrlWrapper(productsController.deleteById) )
// router.get('/:type', ctrlWrapper(productsController.getAllByType) )