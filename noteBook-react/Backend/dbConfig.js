const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/iNoteBook";

let dbConnect = async () => {
 try{
   await mongoose.connect(url);
  console.log("Connected to MongoDB successfully.");
 }catch(err){
console.log(error?.message)
 }
};

module.exports = dbConnect;
