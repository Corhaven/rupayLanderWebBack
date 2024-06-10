const axios  = require("axios");

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };
  
  const sendOTP = async (phone, otp) => {
    // Implement your OTP sending logic here (SMS, email, etc.)
    try {
        const response = await axios.get(`https://2factor.in/API/V1/${process.env.API_KEY_2fa}/SMS/${phone}/${otp}`);
        // console.log(response)
        if (response.data.Status !== 'Success') {
          throw new Error('Failed to send OTP');
        }
        // res.status(200).send('OTP sent successfully');
        console.log("otp send")
      } catch (error) {
        console.error('Error sending OTP:', error);
        // res.status(500).send('Error sending OTP');
      }
  };
  
  module.exports = { generateOTP, sendOTP };
  