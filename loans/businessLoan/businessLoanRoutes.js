const express = require("express");
const {validator} = require("../../middlewares/validators");
const submitController = require("./businessLoanController");
const upload = require("../../helpers/multer");
const authMiddleware = require("../../middlewares/authmiddleware");
const businessLoanRouter = express.Router();
const imgObject = upload.fields([
    { name: 'panCard', maxCount: 1 },
    { name: 'aadharfront', maxCount: 1 },
    { name: 'aadharback', maxCount: 1 },
    { name: 'gstMsmeCerificate', maxCount: 1 },
    { name: 'itrComution1', maxCount: 1 },
    { name: 'itrComution2', maxCount: 1 },
    { name: 'itrComution3', maxCount: 1 }, 
    { name: 'oneBankStatementCurrentAccount', maxCount: 1 },
    { name: 'oneYearSavingAccountStatement', maxCount: 1 },
    { name: 'propertyChain', maxCount: 1 },
    { name: 'map', maxCount: 1 }])

businessLoanRouter.post("/submit",imgObject,authMiddleware, submitController)


module.exports = businessLoanRouter;