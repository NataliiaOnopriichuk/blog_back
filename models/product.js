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
    imageUrl: {
        type: String,
        default: 'https://s1.zhovta.info/storage/resized/5058f1af8388633f609cadb75a75dc9d/405x240/.default.png',
    },
},
{
    versionKey: false,
    timestamps: true,
})

export const Product = model('product', ProductSchema)
