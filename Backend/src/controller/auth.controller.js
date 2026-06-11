const userModel = require("../models/user.model")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const blacklistModel = require('../models/blacklist.model')
const tokenBlacklistModel = require("../models/blacklist.model")

/**
 * @name registerUserController
 * @route /api/auth/register
 * @description register new user, expects username, password and email
 * @access Public
 */
async function registerUserController(req, res) {
    const { email, username, password } = req.body
    if (!email || !username || !password) {
        return res.status(400).json({
            message: "Please provide username, email and password"
        })
    }

    const isUserAlreadyExist = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if (isUserAlreadyExist) {
        return res.status(400).json({
            message: "Account already exist with this username or email"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000
})

    res.status(201).json({
        message: "User created successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}

/**
 * @name loginUserController
 * @description login a user expects email and password in body
 */
async function loginUserController(req, res) {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    if (!user) {
        return res.status(400).json({
            message: "Email or password is incorrect"
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Email or password is incorrect"
        })
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )
    res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000
})
    res.status(200).json({
        message: "User Logged in success",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        }
    })
}

/**
 * @name logoutUserController
 * @description clear token from user cookie and add token to blacklist
 * @access public
 */
async function logoutUserController(req, res) {
    const token = req.cookies.token 
    if(token){
        await tokenBlacklistModel.create({token})
    }
    res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none"
})
    res.status(200).json({
        message: "User logout success"
    })
}

/**
 * @name getmeController
 * @description get current logged in user details
 * @access public
 */
async function getmeController(req,res) {
    const user = await userModel.findById(req.user.id)
    return res.status(200).json({
        message:"User details fetched success",
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getmeController
}