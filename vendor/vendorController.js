const Joi = require("joi");
const vendorSchema = require("./vendorSchema");
const venderModel = require("../models/venderModel");
const { hashPassword, comparePassword } = require("../helpers/hashpassword");
const jwt = require("jsonwebtoken");
const { generateOTP, sendOTP } = require("../helpers/otp");
const loanModel = require("../models/loanModel");

const signUp = async (req, res) => {
  try {
 
    const {username,email,password,mobile,company,state,city,pinCode,address,experience} = req.body;
    const exisitingUser = await venderModel.findOne( {'basicInfo.email':email} );
    const qualification = " "
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "already Register please login",
      });
    }
    const hashedPassword = await hashPassword(password);
    const otp = generateOTP();
    // console.log(otp)
    const otpExpires = Date.now() + 120000; // 2 min
    const vendor = await new venderModel({
      basicInfo :
     { username,email,mobile,qualification,company,state,city,pinCode,address,experience},
     password :hashedPassword,
     otp,
      otpExpires }).save(); 
     console.log(vendor)

    sendOTP(mobile, otp);

  console.log("dsnjfjds")


 
    res.status(201).send({
      success: true,
      message: "Vendor Register Successfully",
      vendor,
    });
  } catch (error) {
    console.log(error.message)
    res.status(201).send({
      success: false,
      message: error.message,
   
    });
  }}

   
const loginController = async (req,res) =>{
  try {
  const {email,password} = req.body;
  const vendor = await venderModel.findOne({"basicInfo.email" : email});
  console.log("vendor",vendor)
  if(!vendor){
    return res.status(200).send({
      success:false,
      message:"Invalid Email ",
      });
    }
    const match = await comparePassword(password,vendor.password)
   if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
 const payload  = {_id : vendor._id,basicInfo : vendor.basicInfo}
const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3h' });
const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '3d' });
res.cookie("accessToken", accessToken, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: 3600000 // expires in 1 hour
});
res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'Strict',maxAge :259200000 });

res.json({ message: 'Logged in successfully' });
} catch (error) {
    console.log(error)
}
  }

  const updateController = async(req,res)=>{
    try{
    const { basicInfo, companyDetail, bankDetail } = req.body;
    // console.log(bankDetail)
    // console.log(companyDetail)
    const updateData = {};

    if (basicInfo) {
      const { error } = vendorSchema.basicInfoSchema.validate(basicInfo);
      if (error) {
        res.status(500).send({message : error.message})

      }
      updateData.basicInfo = { ...basicInfo };
    }

    if (companyDetail) {
      const { error } = vendorSchema.companyDetailSchema.validate(companyDetail);
      if (error) {
        res.status(500).send({message : error.message})
      }
      updateData.companyDetail = { ...companyDetail };
    }

    if (bankDetail) {
      const { error } = vendorSchema.bankDetailSchema.validate(bankDetail);
      if (error) {
        res.status(500).send({message : error.message});
      }
      const filteredBankDetails = {};
      for (const key in bankDetail) {
        if (bankDetail[key]) {
          filteredBankDetails[key] = bankDetail[key];
        }
      }
      updateData.bankDetail = filteredBankDetails;
    }
    const updatedUser = await venderModel.findByIdAndUpdate(req.vendor._id, { $set: updateData }, { new: true });

    if (!updatedUser) {
      res.status(500).send({message :"User not found"}) ;
    }

    res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser,
      });
  } catch (error) {
    res.status(500).send({message : error.message})
    console.log(error)
  }
};




const getvendorLoan = async(req,res)=>{
  const vendorId = req.vendor._id

  const loans = await loanModel.find({vendorId},{'details.document' : 0,"details.runningLoan" :0})


  res.status(200).send({
    success : true,
    loans
  })
  
}
// const getAllpersonalLoan = async(req,res)=>{
//   const vendorId = req.vendor._id;
//   console.log("vendorId",vendorId)
//   const loans = await loanModel.find({_id :vendorId,type : 'personal loan balance transfer'})

  
//   res.status(200).send({
//     success : true,
//     loans
//   })
// }
module.exports = {signUp,loginController,updateController,getvendorLoan}