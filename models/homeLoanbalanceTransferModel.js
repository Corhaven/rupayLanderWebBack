
const mongoose = require("mongoose");
const { personalDetailSchema, professionalDetailSchema, runningloanSchema, propertyDetailSchema } = require("../common/commonSchema");

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
  propertyChain :{
    type: String,
  },
  map :{
    type: String,
  },
  sanctionLetter :{
    type: String,

  }
};
const homeLoanbalanceTransferSchema = new Schema(
  {
    personalDetail :{
    type : personalDetailSchema,
    required : true
    },
    professionalDetail :
    {
      type : professionalDetailSchema,
      required : true
    },
    propertyDetail :{
        type : propertyDetailSchema,
        required : true
    }
     ,
    runningLoan :{
      type : runningloanSchema,
      required : true
    }  ,
    document :
    {
      type : UserDocsData,
      required : true 
    }         
  },{ timestamps: true} 
);

module.exports =  mongoose.model("homeLoanbalanceTransfer", homeLoanbalanceTransferSchema);


