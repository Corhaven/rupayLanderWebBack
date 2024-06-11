// homeLoanbalanceTransfer
const homeLoanbalanceTransferModel = require("../../models/homeLoanbalanceTransferModel");
const loanModel = require("../../models/loanModel");

const submitController = async(req,res)=>{
    try{
const {personalDetail,professionalDetail,propertyDetail ,runningLoan} = req.body

if (!propertyDetail || !professionalDetail || !propertyDetail || !runningLoan) {
  return res.status(400).json({
    error: 'propertyDetail, professionalDetail,propertyDetail , and runningLoan are required'
  });
}
const vendorId = req.vendor._id;
const vendorInfo = req.vendor.basicInfo

const files = req.files;
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
      propertyChain : files.propertyChain[0].location || " ",
      map :files.map[0].location || " ",
      sanctionLetter :files.sanctionLetter[0].location || " "
    }

    const details = {
      personalDetail :JSON.parse(personalDetail),
      propertyDetail: JSON.parse(propertyDetail)
      ,professionalDetail: JSON.parse(professionalDetail),
      runningLoan: JSON.parse(runningLoan),
      document: userDocs}
    


const loan = await new loanModel({
  vendorId,
  vendorInfo,
  type : 'home loan balance transfer',
  details
}).save();

// const homeLoanbalanceTransfer = await new homeLoanbalanceTransferModel({
//   personalDetail :JSON.parse(personalDetail),
//   propertyDetail: JSON.parse(propertyDetail)
//   ,professionalDetail: JSON.parse(professionalDetail),
//   runningLoan: JSON.parse(runningLoan),
//   document: userDocs}).save()
res.status(201).json({
    message: 'Home loan balance transfer details added successfully',
    loan
  });
} catch (error) {
  res.status(500).json({ error: error.message });
}
}

const getAllHomeLoantransferController = async(req,res)=>{
  try{
    const loans = await loanModel.find({type : 'home loan balance transfer'})
    res.status(200).send({
      success : true,
      loans
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).send({success : false,message : error.message})
  }
}

module.exports = {submitController,getAllHomeLoantransferController}