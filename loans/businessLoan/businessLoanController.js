const businessloanModel = require("../../models/businessloanModel");
const loanModel = require("../../models/loanModel");



const submitController = async(req,res)=>{
  try {
    const { personalDetail, professionalDetail, runningLoan} = req.body;


if (!personalDetail || !professionalDetail || !runningLoan) {
  return res.status(400).json({
    error: ' professionalDetail,propertyDetail , and runningLoan are required'
  });
}
const  vendorId = req.vendor
const files = req.files;
       console.log("req.files",req.files)
    const userDocs = { 
      panCard : files.panCard[0].location || " " ,
      aadharfront : files.aadharfront[0].location || " " ,
      aadharback : files.aadharback[0].location || " " ,
      gstMsmeCerificate : files.gstMsmeCerificate[0].location || " " ,

      itrComution1 : files.itrComution1[0].location || " " ,
      itrComution2 : files.itrComution2[0].location || " " ,
      itrComution3 : files.itrComution3[0].location || " " ,
      oneBankStatementCurrentAccount : files.oneBankStatementCurrentAccount[0].location || " " ,
      oneYearSavingAccountStatement :files.oneYearSavingAccountStatement[0].location || " ",
      propertyChain : files.propertyChain[0].location || " ",
      map :files.map[0].location || " ",
    }

    const details = {
      personalDetail: JSON.parse(personalDetail),
      professionalDetail: JSON.parse(professionalDetail),
      runningLoan: JSON.parse(runningLoan),
      document: userDocs
    }
    const businessloan = await new businessloanModel({
      personalDetail :JSON.parse(personalDetail),
      professionalDetail : JSON.parse(professionalDetail),
      runningLoan :JSON.parse(runningLoan),
      document: userDocs
    }).save()
    const loan = await new loanModel({
      vendorId,
      type : 'business loan',
      details
    }).save();
    res.status(201).json({
      message: 'business loan details added successfully',
      businessloan,
      loan
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}
module.exports = submitController;
