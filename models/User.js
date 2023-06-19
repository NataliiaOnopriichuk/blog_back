import {Schema, model} from "mongoose"

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, 'Set email for user'],
        match: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
        unique: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: [true, 'Set password for user'],
    },
    token: {
        type: String,
        default: '',
    },
},
    {
        versionKey:false,
        timestamps: true,
    })



export const User = model('user', userSchema);
