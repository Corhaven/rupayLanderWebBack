
const mongoose = require("mongoose");
const { personalDetailSchema, professionalDetailSchema, runningloanSchema } = require("../common/commonSchema");
const { Schema } = mongoose;

const UserDocsData = {
  panCard: {
    type: String,
  },
  aadharfront: {
    type: String,
  },
  aadharback: {
    type: String,
  },
  payslip1: {
    type: String,
  },
  payslip2: {
    type: String,
  },
  payslip3: {
    type: String,
  },
  sevenMonthStatement: {
    type: String,
  },	form16 :{
    type: String,
  },
  form26 :{
    type: String,
  },
  closerLetter1 :{ type: String,},
  closerLetter2 :{ type: String,},

closerLetter3 :{ type: String,}
};

const personalLoanBalanceTransferSchema = new Schema(
  {
    personalDetail :{
    type : personalDetailSchema
    },
    professionalDetail :
    {
      type : professionalDetailSchema,
      required : true
    }
     ,
    runningLoan :{
      type : runningloanSchema,
      required : true

    },
    document: {
      type : UserDocsData,
      required : true

    }
            
  },{ timestamps: true} 
);

module.exports =  mongoose.model("personalLoanBalanceTransfer", personalLoanBalanceTransferSchema);


