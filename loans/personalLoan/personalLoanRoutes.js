const express = require("express");
const {validator} = require("../../middlewares/validators");
const submitController = require("./personalLoanController");
const upload = require("../../helpers/multer");
const authMiddleware = require("../../middlewares/authmiddleware");
const personalLoanRouter = express.Router();
const cpLoad = upload.fields([
    { name: 'panCard', maxCount: 1 },
    { name: 'aadharfront', maxCount: 1 },
    { name: 'aadharback', maxCount: 1 },
    { name: 'payslip1', maxCount: 1 },
    { name: 'payslip2', maxCount: 1 },
    { name: 'payslip3', maxCount: 1 },
    { name: 'sevenMonthStatement', maxCount: 1 }
  ])

personalLoanRouter.post("/submit",authMiddleware,cpLoad,submitController)


module.exports = personalLoanRouter;