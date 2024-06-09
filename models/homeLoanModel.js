
const mongoose = require("mongoose");
const {professionalDetailSchema, runningloanSchema, propertyDetailSchema } = require("../common/commonSchema");
const { currentMonthAndYearInString } = require("../helpers/hashpassword");

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
  }
};

  
const homeLoanSchema = new Schema(
  
  {
    vendorId : { type: mongoose.Schema.Types.ObjectId, ref: 'vendor', required: true },
    propertyDetail :{
    type : propertyDetailSchema,
    required : true
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

    },
    status: { type: String, enum: ['on-Hold', 'processed', 'pending', 'cancelled'], default: 'pending' },
    paymentStatus: { type: String, enum: ['received', 'not received'], default: 'not received' },
    createdLoan:
    { type: String, default: currentMonthAndYearInString() },
            
  },{ timestamps: true} 
);

module.exports =  mongoose.model("homeLoan", homeLoanSchema);


