
const mongoose = require("mongoose");
const { personalDetailSchema, professionalDetailSchema, runningloanSchema, propertyDetailSchema, businessprofessionalDetailSchema } = require("../common/commonSchema");
const document = require("./documentModel");
const { Schema } = mongoose;
// const { required } = require("joi");
const currentMonthAndYearInString = () => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const today = new Date();
  const formattedDate = `${today.getDate()} ${ 
    monthNames[today.getMonth()]
  } ${today.getFullYear()}`;
  return formattedDate;
};
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

closerLetter3 :{ type: String,},
propertyChain :{
    type: String,
  },
  map :{
    type: String,
  }, gstMsmeCerificate
  : {
      type: String,
    },
  
    itrComution1: {
      type: String,
    },
    itrComution2: {
      type: String,
    },
        itrComution3
     :{
      type: String,
    },
    oneBankStatementCurrentAccount :{
      type: String,
    },
  
    oneYearSavingAccountStatement :{
      type: String,
    }, sanctionLetter :{
        type: String,
    
      }
};
const detailsScehma = new Schema({  personalDetail :{
    type : personalDetailSchema,
    
  },
  professionalDetail :
  {
      type : professionalDetailSchema,
  }
  ,
  runningLoan :{
      type : runningloanSchema,
  },
  propertyDetail:{
    type : propertyDetailSchema,
  },
  businessprofessionalDetailSchema :{
    type : businessprofessionalDetailSchema,
  },
  document :
  {
      type :UserDocsData ,
      required : true
  },
  })
const loanSchema = new Schema(
  {   
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'vendor', required: true },
    type :  {
        type: String,
        enum: ['personal loan', 'home loan', 'loan against property','business loan',
         'home loan balance transfer','personal loan balance transfer'],
        required: true,
      },
      details :{
       type : detailsScehma,
       required : true
         
        },   
      status: { type: String, enum: ['on-Hold', 'processed', 'pending', 'cancelled'], default: 'pending' },
     paymentStatus: { type: String, enum: ['received', 'not received'], default: 'not received' },
     createdLoan:
     { type: String, default: currentMonthAndYearInString() },
    //  createdAt: { type: Date, default: Date.now },
     updatedAt: { type: Date, default: Date.now },
            
  },{ timestamps: true} 
);

module.exports =  mongoose.model("loan",loanSchema);


