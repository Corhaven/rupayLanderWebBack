const jwt = require("jsonwebtoken") ;


const authMiddleware = async (req, res, next) => {

  try {
  let token = req.cookies.accesstoken
  ;
  if (token) {
    const decoded =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("decoded",decoded._id)
    if(decoded){
      req.vendor = decoded; 
    }
   }
    next();
  } catch (err) {
    console.log(err.message)
    res.status(400).json({ message: 'Unauthorized: Invalid token' });
  }
};
   

module.exports =  authMiddleware ;

