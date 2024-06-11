const express = require("express");
const {submitController,getAllpersonalloanBalancetransfer} = require("./personalLoanBalanceTransferController");
const upload = require("../../helpers/multer");
const authMiddleware = require("../../middlewares/authmiddleware");
const personalLoanBalanceTransferRouter = express.Router();
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
    { name: 'closerLetter1', maxCount: 1 },
    { name: 'closerLetter2', maxCount: 1 },
    { name: 'closerLetter3', maxCount: 1 }

  ])

personalLoanBalanceTransferRouter.post("/submit",imgObject,authMiddleware,submitController)

personalLoanBalanceTransferRouter.get("/get-all-personal-loan-balance-transfer",authMiddleware,getAllpersonalloanBalancetransfer)

module.exports = personalLoanBalanceTransferRouter;