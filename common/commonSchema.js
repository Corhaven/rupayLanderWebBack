const Joi = require('joi');

const personalDetailSchema = Joi.object().keys({
  username:  Joi.string().required(),
  mobile : Joi.number().required(),
  loanAmount : Joi.number().required(),
  state : Joi.string().required(),
  city : Joi.string().required(),
  presentAddress : Joi.string().required(),
  residentAddress : Joi.string().required(),
  email: Joi.string().email().required(),
 });
const professionalDetailSchema =  Joi.object().keys({
  company:  Joi.string().required(),
  companyName : Joi.string().required(),
  companyAddress : Joi.string().required(),
  state : Joi.string().required(),
  city : Joi.string().required(),
  pinCode : Joi.number().required(),
  officeEmail: Joi.string().email().required(),
  monthlyNetCreditSalary : Joi.number().required(),
  salaryBankAccount :Joi.string().required()
 });
 const runningloanSchema = Joi.object().keys({
  runningloans:  Joi.boolean().required(),
  bank : Joi.string().required(),
  loanType : Joi.string().required(),
  loanAmount : Joi.number().required(),
  monthlyEmi : Joi.number().required(),
  vintage : Joi.number().required(),
 
 });
 
 const propertyDetailSchema =Joi.object().keys({
    propertyType : Joi.string().required(),
    marketValue : Joi.number().required(),
    loanAmount : Joi.number().required(),
   
   });

   const businessprofessionalDetailSchema =  Joi.object().keys({
    business:  Joi.string().required(),
    businessName : Joi.string().required(),
    businessAddress : Joi.string().required(),
    state : Joi.string().required(),
    city : Joi.string().required(),
    pinCode : Joi.number().required(),
    officeEmail: Joi.string().email().required(),
    monthlyNetCreditSalary : Joi.number().required(),
    salaryBankAccount :Joi.string().required()
   });
  //  const documentSchema = Joi.object().keys
 module.exports = {personalDetailSchema,businessprofessionalDetailSchema,professionalDetailSchema,runningloanSchema,propertyDetailSchema};