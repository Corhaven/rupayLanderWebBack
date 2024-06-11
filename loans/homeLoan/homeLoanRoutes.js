const express = require("express")
const {validator} = require("../../middlewares/validators");
const {submitController, getAllhomeLoanController} = require("./homeLoanController");
const upload = require("../../helpers/multer");
const authMiddleware = require("../../middlewares/authmiddleware");

const homeLoanRouter = express.Router();
const imgObject = upload.fields([
    { name: 'panCard', maxCount: 1 },
    { name: 'aadharfront', maxCount: 1 },
    { name: 'aadharback', maxCount: 1 },
    { name: 'payslip1', maxCount: 1 },
    { name: 'payslip2', maxCount: 1 },
    { name: 'payslip3', maxCount: 1 },
    { name: 'sevenMonthStatement', maxCount: 1 }, 
    { name: 'form16', maxCount: 1 },
    { name: 'form26', maxCount: 1 },
    { name: 'propertyChain', maxCount: 1 },
    { name: 'map', maxCount: 1 }

  ])


homeLoanRouter.post("/submit",imgObject,authMiddleware,submitController)
homeLoanRouter.get("/getall-home-loans",authMiddleware, getAllhomeLoanController)

module.exports  = homeLoanRouter