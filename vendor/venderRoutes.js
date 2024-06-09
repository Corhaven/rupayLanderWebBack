const express = require("express")
const {signUp,loginController, forgotPasswordController, updateController, verifyOTP,
 resetPassword, getvendorLoan, getAllpersonalLoan} = require("./vendorController");
const {validator} = require("../middlewares/validators");
const {basicInfoSchema, signupSchema, loginSchema} = require("./vendorSchema");
const authMiddleware = require("../middlewares/authmiddleware");
const venderRouter = express.Router()
venderRouter.post("/register",validator(signupSchema),signUp) 
venderRouter.post("/login",validator(loginSchema),loginController) 


venderRouter.post("/update-profile",authMiddleware,updateController) 
// venderRouter.get("/get-vendor-loans",authMiddleware,getvendorLoan) 
venderRouter.get("/get-all-personal-loans",authMiddleware,getAllpersonalLoan) 


venderRouter.post('/token', async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);

  try {
    const user = await verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = generateAccessToken({ username: user.username });
    res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'Strict' });
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(403);
  }
});
 
module.exports = venderRouter;