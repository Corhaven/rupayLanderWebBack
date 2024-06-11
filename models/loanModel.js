
const mongoose = require("mongoose");
const { personalDetailSchema, professionalDetailSchema, runningloanSchema, propertyDetailSchema, businessprofessionalDetailSchema } = require("../common/commonSchema");
const document = require("./documentModel");
const { currentMonthAndYearInString } = require("../helpers/hashpassword");
const { Schema } = mongoose;
 
const  basicInfoSchema ={
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true    },
 
  // mobile: MobileNumberValidator,
  mobile: {
    type: Number,
    required: true},

    qualification :{
      type : String,
      required : true
    },
 
company :{
  type : String,

},
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  
  experience :{
  type : Boolean
}}

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
    vendorInfo :{
      type : basicInfoSchema
    },
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
      status: 
      { type: String,
         enum: ['on-Hold', 'processed', 'pending', 'cancelled'],
         default: 'pending' },
     paymentStatus:
      { type: String, 
      enum: ['received', 'not received'],
       default: 'not received' },
     createdLoan:
     { type: String,
       default: currentMonthAndYearInString() },
    //  createdAt: { type: Date, default: Date.now },
     updatedAt: { type: Date, default: Date.now },
            
  },{ timestamps: true} 
);

module.exports =  mongoose.model("loan",loanSchema);


