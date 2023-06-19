import { Product } from "../models/product.js"

const getAll = async (req, res, next) => {
    const {id: owner} = req.user
    const {type} = req.query
    const filter = {owner}
    if(type){
   filter.type = type
    }
    const result = await Product.find(filter, "-createdAt -updatedAt").populate('owner', 'name email')
    res.json(result)
}


const getById = async (req, res, next) => {
    const { id } = req.params
    const result = await Product.findById(id)
    if (!result) {
        throw RequestError(404, 'Not found')
    }
    res.json(result)
}

const addProduct = async (req, res, next) => {
  const {id: owner} = req.user
 const result = await Product.create({...req.body, owner})
 res.status(201).json(result)
}

const deleteById = async (req, res, next) => {
    const { id } = req.params
    const result = await Product.findByIdAndRemove(id)
    if (!result) {
        throw RequestError(404, 'Not found')
    }
    res.json({ message: "Product deleted" })
}


export const productsController = {
    getAll,
    getById,
    addProduct,
    deleteById
}