const mongoose = require("mongoose");

const departmentSchema = mongoose.Schema({
  departmentName: {
    type: String,
    required: [true, "please enter department name"],
  },
  departmentImage: {
    type: String,
  },
  year: {
    type: String,
    required: [true, "please enter department founded year"],
  },
  description: {
    type: String,
    required: [true, "please enter description"],
  },
});

module.exports = mongoose.model("department", departmentSchema);
