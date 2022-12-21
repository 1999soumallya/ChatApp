const mongoose = require('mongoose')

const userModel = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAvtarImageSet: {
        type: Boolean,
        default: false,
    },
    avtarImage: {
        type: String,
        default: ""
    }
})

const UserModel = mongoose.model('UserModel', userModel)

module.exports = UserModel