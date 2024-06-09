const express = require("express")
const { verifyOTP, resetPassword, forgotPasswordController } = require("./authController")

const authRouter = express.Router()
authRouter.post("/verify-otp",verifyOTP) 
authRouter.post("/reset-password",resetPassword) 
authRouter.post("/forgot-password",forgotPasswordController) 

module.exports = authRouter