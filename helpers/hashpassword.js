// import bcrypt from "bcrypt";
const bcrypt = require("bcrypt")
 const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

 const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

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

module.exports = {hashPassword,comparePassword,currentMonthAndYearInString}