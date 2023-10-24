const multer = require("multer");

var emplostorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/employe");
  },
  filename: (req, file, cb) => {
    console.log(file.mimetype);
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname}_${Date.now()}.${ext}`);
  },
});

var headstorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/head");
  },
  filename: (req, file, cb) => {
    console.log(file.mimetype);
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname}_${Date.now()}.${ext}`);
  },
});

var departmentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/department");
  },
  filename: (req, file, cb) => {
    console.log(file.mimetype);
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname}_${Date.now()}.${ext}`);
  },
});

module.exports = { emplostorage, headstorage, departmentStorage };
