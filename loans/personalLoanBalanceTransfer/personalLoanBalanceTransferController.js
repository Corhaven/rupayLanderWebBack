// personalLoanBalanceTransfer
const loanModel = require("../../models/loanModel");
// const personalLoanBalanceTransferModel = require("../../models/personalLoanBalanceTransferModel")

const submitController = async(req,res)=>{
  try {
    const { personalDetail, professionalDetail, runningLoan} = req.body;
    const vendorId = req.vendor._id;
    if (!personalDetail || !professionalDetail || !runningLoan) {
      return res.status(400).json({
        error: 'personalDetail, professionalDetail, and runningLoan are required'
      });
    }
    const files = req.files;
    const vendorInfo = req.vendor.basicInfo

        const userDocs = { 
          panCard : files.panCard[0].location || " " ,
          aadharfront : files.aadharfront[0].location || " " ,
          aadharback : files.aadharback[0].location || " " ,
          payslip1 : files.payslip1[0].location || " " ,
    
          payslip2 : files.payslip2[0].location || " " ,
          payslip3 : files.payslip3[0].location || " " ,
          sevenMonthStatement : files.sevenMonthStatement[0].location || " " ,
          form16 : files.form16[0].location || " " ,
          form26 :files.form26[0].location || " ",
          closerLetter1 : files.closerLetter1[0].location || " ",
          closerLetter2 :files.closerLetter2[0].location || " ",
          closerLetter3 :files.closerLetter3[0].location || " "
        }
    
        const details = {
          personalDetail: JSON.parse(personalDetail),
          professionalDetail: JSON.parse(professionalDetail),
          runningLoan: JSON.parse(runningLoan),
          document: userDocs
        }

    const loan = await new loanModel({
      vendorId,
      vendorInfo ,
      type : 'personal loan balance transfer',
      details
    }).save();
  
    res.status(201).json({
      message: ' personal Loan Balance Transfer details added successfully',
      loan
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}

const getAllpersonalloanBalancetransfer = async(req,res)=>{
  try {
    const vendorId = req.vendor._id;
    console.log(vendorId)
    const loans = await loanModel.find({
      type :
      "personal loan balance transfer"
      })
    console.log(loans)
    res.status(200).send({
      success : true,
      loans
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).send({success : false,message : error.message})
  }
 
}
module.exports = {submitController,getAllpersonalloanBalancetransfer};

