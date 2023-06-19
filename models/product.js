import {Schema, model} from "mongoose"

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
        enum: ['food products', 'household chemicals', 'cosmetics'],
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
},
{
    versionKey: false,
    timestamps: true,
})

export const Product = model('product', ProductSchema)
