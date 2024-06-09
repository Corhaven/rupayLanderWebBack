const {documentModel} = require("../../models/documentModel");
const loanModel = require("../../models/loanModel");
const personalLoanModel = require("../../models/personalLoanModel")


//

const submitController = async(req,res)=>{
  try {
    const { personalDetail, professionalDetail, runningLoan} = req.body;
    if (!personalDetail || !professionalDetail || !runningLoan) {
      return res.status(400).json({
        error: 'personalDetail, professionalDetail, and runningLoan are required'
      });
    }
    const files = req.files;
     const vendorId = req.vendor
    const userDocs = { 
      panCard : files.panCard[0].location || " " ,
      aadharfront : files.aadharfront[0].location || " " ,
      aadharback : files.aadharback[0].location || " " ,
      payslip1 : files.payslip1[0].location || " " ,

      payslip2 : files.payslip2[0].location || " " ,
      payslip3 : files.payslip3[0].location || " " ,
      sevenMonthStatement : files.sevenMonthStatement[0].location || " " ,
    }
    
    const details = {
      personalDetail: JSON.parse(personalDetail),
      professionalDetail: JSON.parse(professionalDetail),
      runningLoan: JSON.parse(runningLoan),
      document: userDocs
    }
  
    const personalLoan =  await new personalLoanModel({
      vendorId,
      personalDetail: JSON.parse(personalDetail),
      professionalDetail: JSON.parse(professionalDetail),
      runningLoan: JSON.parse(runningLoan),
      document: userDocs
     
    }).save()
    const loan = await new loanModel({
      vendorId,
      type : 'personal loan',
      details
    }).save();
 
    res.status(201).json({
        message: 'Personal loan details added successfully',
        personalLoan
      });  
 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
module.exports = submitController;

