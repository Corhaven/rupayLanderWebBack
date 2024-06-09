const mongoose = require("mongoose")

const  connect= async ()=>{
try {
    
    await mongoose.connect(process.env.MONGO_URL) 
    console.log("database comnnected")
} catch (error) {
    
}
}
module.exports = connect
