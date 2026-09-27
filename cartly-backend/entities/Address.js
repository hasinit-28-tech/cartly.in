const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  pincode: String
});

module.exports = mongoose.model("Address", addressSchema);