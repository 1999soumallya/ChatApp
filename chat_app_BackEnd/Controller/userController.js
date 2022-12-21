const UserModel = require('../Models/userModel')
const bcrypt = require('bcrypt')

module.exports.register = async (req, res, next) => {
    try {
        const { userName, email, password } = req.body
        const UserNameCheck = await UserModel.findOne({ userName })
        if (UserNameCheck) return res.json({ msg: "User Already Exsist With this User Name", status: false })
        const emailCheck = await UserModel.findOne({ email })
        if (emailCheck) return res.json({ msg: "User Already Exsist With this Email Id", status: false })
        const hashPassword = await bcrypt.hash(password, 10);
        const userCreate = await UserModel.create({ userName, email, password: hashPassword })
        delete userCreate.password
        return res.status(200).json({ status: true, userCreate });
    } catch (error) {
        next(error)
    }
}

module.exports.login = (req, res, next) => {
    console.log(req.body);
}