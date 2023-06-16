import { Product } from "../models/product.js"

const getAll = async (req, res, next) => {
    const result = await Product.find({}, "-createdAt -updatedAt")
    res.json(result)
}

// const getAllByType = async (req, res, next) => {
//     const { type } = req.params;
//     console.log(type);
//     const result = await Product.find({}, "-createdAt -updatedAt");
//     console.log(result);
//     const filteredProducts = result.filter((prod) => prod.type === type);
//     res.json(filteredProducts);
// };

const getById = async (req, res, next) => {
    const { id } = req.params
    const result = await Product.findById(id)
    if (!result) {
        throw RequestError(404, 'Not found')
    }
    res.json(result)
}

export const addProduct = async (req, res, next) => {
 const result = await Product.create(req.body)
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
    // getAllByType,
    getById,
    addProduct,
    deleteById
}