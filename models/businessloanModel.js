
const mongoose = require("mongoose");
const { personalDetailSchema, runningloanSchema, businessprofessionalDetailSchema } = require("../common/commonSchema");
const { required } = require("joi");

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
  gstMsmeCerificate
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
  },
  propertyChain :{
    type: String,
  },
  map :{
    type: String,
  }
};

const businessLoanSchema = new Schema(
  {
    personalDetail :{
    type : personalDetailSchema,
    required : true

    },
    professionalDetail :
    {
      type : businessprofessionalDetailSchema,
      required : true
    }
     ,
    runningLoan :{
      type : runningloanSchema,
      required : true

    }   ,
    document :{
      type :UserDocsData,
      required : true
    }    
  },{ timestamps: true} 
);

module.exports =  mongoose.model("businessLoan", businessLoanSchema);


