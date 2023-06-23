import { RequestError } from "../helpers/index.js"
import { productsDir } from "../middlewares/upload.js"
import { Product } from "../models/product.js"
import path from 'path'
import Jimp from 'jimp'
import fs from 'fs/promises'
import { log } from "console"

const getAll = async (req, res, next) => {
    // const {id: owner} = req.user
//     const {type} = req.query
//     const filter = {}
//     if(type){
//    filter.type = type
//     }
    // if(owner){
    //     filter.owner = owner
    //      }
    const result = await Product.find({}, "-createdAt -updatedAt").populate('owner', 'name email')
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

const updateById = async (req, res, next) => {
    const { id } = req.params
    const result = await Product.findByIdAndUpdate(id, req.body)
    if (!result) {
        throw RequestError(404, 'Not found')
    }
    res.json(result)
}

const deleteById = async (req, res, next) => {
    const { id } = req.params
    const result = await Product.findByIdAndRemove(id)
    if (!result) {
        throw RequestError(404, 'Not found')
    }
    res.json({ message: "Product deleted" })
}

const upload = async (req, res, next) => {
    try {
    const { id } = req.params;
    const {path: tempDir, originalname} = req.file
    const [extention] = originalname.split(".").reverse()
    const productName = `${id}.${extention}`
    const resultUpload = path.join(productsDir, productName)
    const image = await Jimp.read(`./temp/${originalname}`);
    await image.writeAsync(`./temp/${originalname}`);
    await fs.rename(tempDir, resultUpload);

    const imageUrl = path.join('public', 'products', productName);
    await Product.findByIdAndUpdate(id, { imageUrl })

            res.status(201).json(imageUrl);
    } catch (error) {
        await fs.unlink(req.file.path);
        next(error)
    }
}

export const productsController = {
    getAll,
    getById,
    addProduct,
    updateById,
    deleteById,
    upload
}

