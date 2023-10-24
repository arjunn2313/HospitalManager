const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter your fullname"],
  },
  email: {
    type: String,
    required: [true, "please enter your email"],
  },
  phone: {
    type: String,
    required: [true, "please enter your phone"],
  },
  password: {
    type: String,
    required: [true, "please enter your password"],
  },
});

module.exports = mongoose.model("admin", adminSchema);
