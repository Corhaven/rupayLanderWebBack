
const  mongoose  = require("mongoose");
const { currentMonthAndYearInString } = require("../helpers/hashpassword");
const { boolean } = require("joi");


// const MobileNumberValidator = {
//   value: {
//     type: Number,
//   },
//   verified: {
//     type: Boolean,
//     trim: true,
//   },
//   otp: { type: Number, select: false },
// };

let bankDetailSchema = new mongoose.Schema({
  bankName:{
    type:String,
  },
  ifscCode:{
    type:String,
  },
  accountNumber:{
    type:Number,
  },
  bankAddress :{
    type : String
  }
});
 let companyDetailSchema = new mongoose.Schema({
   companyName :{
    type : String
   },
   
   companyAddress : {
    type : String
   },
   companyPinCode :{
    type : Number
   },companyEmail :{
    type : String
   }
 })
 
const vendorSchema = new mongoose.Schema(

 {  basicInfo : {
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
  },
  //  referral :{
  //   type : String
  //  },
  //  termsAndCondition :{
  //    type : boolean
  //  }
},

  memberSince:
   { type: String, default: currentMonthAndYearInString() },
   companyDetail : companyDetailSchema,
   bankDetail : bankDetailSchema,
   password: {
    type: String,
    required: true,
  },
  otp: String, // For OTP verification
  otpExpires: Date ,
  isVerified: {
    type: Boolean,
    default: false
  },
  role: { type: String, enum: ['admin', 'sub-admin', 'vendor'], default: 'vendor' }
  },
  { timestamps: true }
);

module.exports =  mongoose.model("Vendor", vendorSchema);
