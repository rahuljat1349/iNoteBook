const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/iNoteBook";




let dbConnect = async() => {
   await mongoose.connect(url); 
   console.log('Connected to Mongo successfully');   
};
 

module.exports = dbConnect;