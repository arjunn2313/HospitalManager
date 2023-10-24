const mongoose = require("mongoose");

const employeSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter employee name"],
  },
  age: {
    type: String,
    required: [true, "please enter employee age"],
  },
  phone: {
    type: String,
    required: [true, "please enter employee phone"],
  },
  image: {
    type: String,
    // required : [true,'please enter employee name']
  },
  description: {
    type: String,
  },
  department: {
    type: String,
  },
  departmentHead: {
    type: String,
  },
});

module.exports = mongoose.model("empploye", employeSchema);
