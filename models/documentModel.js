const mongoose = require("mongoose")

const documentSchema = new mongoose.Schema({
    url: { type: String, required: true },
    documentType: { type: String, required: true }
  });
  
 const documentModel = mongoose.model('document', documentSchema);
 module.exports ={documentModel,documentSchema}