const { documentModel } = require("../../models/documentModel");
const homeLoanModel = require("../../models/homeLoanModel");
const loanModel = require("../../models/loanModel");

const submitController = async(req,res)=>{
    try{
const {propertyDetail,professionalDetail ,runningLoan} = req.body

if (!propertyDetail || !professionalDetail || !runningLoan) {
  return res.status(400).json({
    error: 'propertyDetail, professionalDetail, and runningLoan are required'
  });
}
const files = req.files;
const vendorId = req.vendor._id
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
      propertyChain : files.propertyChain[0].location || " ",
      map :files.map[0].location || " "
    }
    const details = {
      propertyDetail: JSON.parse(propertyDetail),
      professionalDetail: JSON.parse(professionalDetail),
      runningLoan: JSON.parse(runningLoan),
      document: userDocs
    }


const loan = await new loanModel({
  vendorId,
  vendorInfo,
  type : 'home loan',
  details
}).save();

res.status(201).json({
    message: 'Home loan details added successfully',
    loan,

  });
} catch (error) {
  res.status(500).json({ error: error.message });
}
}


const getAllhomeLoanController = async(req,res)=>{
  try {
    const vendorId = req.vendor._id;
    console.log(vendorId)
    const loans = await loanModel.find({
      type :
      "home loan"
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
module.exports = {submitController,getAllhomeLoanController}