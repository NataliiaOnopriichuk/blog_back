import {Schema, model} from "mongoose"

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['food', 'chemicals', 'cosmetics'],
    },
},
{
    versionKey: false,
    timestamps: true,
})

export const Product = model('product', ProductSchema)
