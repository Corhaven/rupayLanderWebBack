const jwt = require("jsonwebtoken") ;


const authMiddleware = async (req, res, next) => {

  try {
  let token = req.cookies.accesstoken
  ;
  if (token) {
    const user =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if(user){

      req.vendor = user._id;
    }
   }
    next();
  } catch (err) {
    res.status(400).json({ message: 'Unauthorized: Invalid token' });
  }
};
   

module.exports =  authMiddleware ;

