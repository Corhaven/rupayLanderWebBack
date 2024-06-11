// homeLoanbalanceTransfer

const express = require("express")
const {validator} = require("../../middlewares/validators");
const {submitController, getAllHomeLoantransferController} = require("./homeLoanbalanceTransferController");
const upload = require("../../helpers/multer");
const authMiddleware = require("../../middlewares/authmiddleware");

const homeLoanbalanceTransferRouter = express.Router();
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
    { name: 'map', maxCount: 1 },
    { name: 'sanctionLetter', maxCount: 1 },
  ],)


homeLoanbalanceTransferRouter.post("/submit",imgObject,authMiddleware,submitController)
homeLoanbalanceTransferRouter.get("/getall-home-loan-balance-transfer",authMiddleware,getAllHomeLoantransferController)

module.exports  = homeLoanbalanceTransferRouter