const mongoose = require("mongoose");

const connectMongoose = () => {
  try {
    const connect = mongoose.connect(process.env.MONGODB);
    console.log(`DATABASE CONNECTED`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectMongoose;
