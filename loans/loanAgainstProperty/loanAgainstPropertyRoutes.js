const express = require("express")
const {validator} = require("../../middlewares/validators");
const submitController = require("./loanAgainstPropertyController");
const upload = require("../../helpers/multer");
const authMiddleware = require("../../middlewares/authmiddleware");



const loanAgainstPropertyRouter = express.Router();
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
loanAgainstPropertyRouter.post("/submit",imgObject,authMiddleware,submitController)

module.exports  = loanAgainstPropertyRouter