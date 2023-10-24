const mongoose = require("mongoose");

const headSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter name"],
  },
  number: {
    type: String,
    required: [true, "please enter number"],
  },
  age: {
    type: String,
    required: [true, "please enter number"],
  },
  image: {
    type: String,
  },
  description: {
    type: String,
    // required:[true,'please enter number']
  },
  department: {
    type: String,
  },
});

module.exports = mongoose.model("heads", headSchema);
