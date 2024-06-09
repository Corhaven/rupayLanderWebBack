const express  = require("express")
const personalLoanRouter = require("./personalLoan/personalLoanRoutes")
const personalLoanBalanceTransferRouter = require("./personalLoanBalanceTransfer/personalLoanBalanceTransferRoutes")
const loanAgainstPropertyRouter = require("./loanAgainstProperty/loanAgainstPropertyRoutes")
const businessLoanRouter = require("./businessLoan/businessLoanRoutes")
const homeLoanbalanceTransferRouter = require("./homeLoanbalanceTransfer/homeLoanbalanceTransferRoutes")
const homeLoanRouter = require("./homeLoan/homeLoanRoutes")

loanRouter = express.Router()

loanRouter.use("/personal-loans",personalLoanRouter)
loanRouter.use("/home-loans",homeLoanRouter)
loanRouter.use("/personal-loan-balance-transfer",personalLoanBalanceTransferRouter)
loanRouter.use("/loan-against-property",loanAgainstPropertyRouter)
loanRouter.use("/business-loan",businessLoanRouter)
loanRouter.use("/home-loan-balance-transfer",homeLoanbalanceTransferRouter)

module.exports = loanRouter