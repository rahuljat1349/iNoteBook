const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/iNoteBook";

let dbConnect = async () => {
  try{
  await mongoose.connect(url);
  console.log("Connected to MongoDB successfully.");
    } catch (error) {
        console.log(`MongoDB connection FAILED: ${error.message}`);
        process.exit(1);
    }
};

module.exports = dbConnect;
