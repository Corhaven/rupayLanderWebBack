
const verifyOTP = async (req, res) => {
  try {
    const { mobile, otp } = req.body;

    const vendor = await venderModel.findOne({"basicInfo.mobile" : mobile,otp});

    if (!vendor) {
      return res.status(400).send({message: "Vendor not found"});
    }

    if (vendor.otp !== otp || vendor.otpExpires < Date.now()) {
      return res.status(400).send({message: "Invalid or expired OTP"});
    }

    vendor.otp = undefined;
    vendor.otpExpires = undefined;
    vendor.isVerified = true;
    await vendor.save();

     res.status(200).send({message:  "OTP verified successfully"})
  } catch (error) {
    console.log(error)
     res.status(500).send({message: error.message})
  }
};

const resetPassword = async (req, res) => {
  try {


    const { mobile, otp, newPassword ,conformpassword} = req.body;
    if(newPassword ===  conformpassword){}
    const vendor = await venderModel.findOne({ 'basicInfo.mobile': mobile });

    if (!vendor) {
      res.status(400).send({success : false,message :'vendor not found' })
    }

    if (vendor.otp !== otp || user.otpExpires < Date.now()) {
      
        res.status(400).send({success : false, message : "Invalid or expired OTP"})

    }
    const hashedPassword = hashPassword(newPassword)

    vendor.password = hashedPassword;
    vendor.otp = undefined;
    vendor.otpExpires = undefined;

    await user.save();
    res.status(200).send({success : true, message : 'Password reset successfully'})

  } catch (error) {
    res.status(400).send({success : false, message : error.message})

  }
}


const forgotPasswordController= async(req,res)=>{
  
  try {
    const { mobile } = req.body;
    const vendor = await venderModel.findOne({ 'basicInfo.mobile': mobile });
    if (!vendor) {
      res.status(400).send({success : false,message :'vendor not found' })
    }

    const otp = generateOTP();
    const otpExpires = Date.now() + 3600000; // 1 hour

    vendor.otp = otp;
    vendor.otpExpires = otpExpires;
    await vendor.save();

    sendOTP(mobile, otp);
   
      res.status(200).send({success: true,  message:'OTP sent successfully'});
  }catch (error) {
  
       res.status(500).send({success : false, message : error.message});
  }
};