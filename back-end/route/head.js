const router = require("express").Router();
const headModel = require("../model/dheadSchema");
const { headstorage } = require("../middleware/middleware");
const multer = require("multer");
const upload = multer({ storage: headstorage });
// GET ALL DEPARTMENT HEAD

router.get("/", (req, res) => {
  try {
    headModel
      .find({})
      .then((data) => {
        res.status(200).json({
          status: true,
          message: data,
        });
      })
      .catch((err) => {
        res.status(404).json({
          status: false,
          message: err.message,
        });
      });
  } catch (error) {
    console.log(error);
  }
});

router.get("/single/:id", (req, res) => {
  try {
    let id = req.params.id;
    headModel
      .findOne({ _id: id })
      .then((data) => {
        res.status(200).json({
          status: true,
          result: data,
        });
      })
      .catch((err) => {
        res.status(404).json({
          status: false,
          message: err.message,
        });
      });
  } catch (error) {
    console.log(error);
  }
});

// ADD DEPARTMENT HEAD

router.post("/add", upload.single("image"), (req, res) => {
  try {
    let { name, number, age, description, department } = req.body;
    headModel
      .create({
        name: name,
        number: number,
        age: age,
        image: "/uploads/head/" + req.file.filename,
        description: description,
        department: department,
      })
      .then(() => {
        res.status(200).json({
          status: true,
          message: "New department head added",
        });
      })
      .catch((err) => {
        res.status(404).json({
          status: false,
          message: err.message,
        });
      });
  } catch (error) {
    console.log(error);
  }
});

router.get("/singleName/:id", (req, res) => {
  try {
    let id = req.params.id;
    headModel
      .findOne({ name: id })
      .then((data) => {
        res.status(200).json({
          status: true,
          result: data,
        });
      })
      .catch((err) => {
        res.status(404).json({
          status: false,
          message: err.message,
        });
      });
  } catch (error) {
    console.log(error);
  }
});

router.get("/departmentname/:id", (req, res) => {
  try {
    let id = req.params.id;
    headModel
      .findOne({ department: id })
      .then((data) => {
        res.status(200).json({
          status: true,
          result: data,
        });
      })
      .catch((err) => {
        res.status(404).json({
          status: false,
          message: err.message,
        });
      });
  } catch (error) {
    console.log(error);
  }
});

router.get("/headNames", (req, res) => {
  try {
    headModel
      .find({}, { name: 1 })
      .then((data) => {
        res.status(200).json({
          status: true,
          result: data,
        });
      })
      .catch((err) => {
        res.status(404).json({
          status: false,
          message: err,
        });
      });
  } catch (error) {
    console.log(error);
  }
});

// EDIT

router.post("/update/:id", upload.single("image"), (req, res) => {
  let { name, number, age, description, department } = req.body;
  const updateObj = {};
  if (req.file) {
    updateObj.image = "/uploads/head/" + req.file.filename;
  }
  if (name) updateObj.name = name;
  if (age) updateObj.age = age;
  if (number) updateObj.number = number;
  if (description) updateObj.description = description;
  if (department) updateObj.department = department;

  try {
    headModel
      .findOneAndUpdate({ _id: req.params.id }, updateObj)
      .then(() => {
        res.status(200).json({
          status: true,
          message: "updation done",
        });
      })
      .catch((err) => {
        res.status(404).json({
          status: false,
          message: err.message,
        });
      });
  } catch (error) {
    console.log(error);
  }
});

// DELETE

router.delete("/delete/:id", (req, res) => {
  let id = req.params.id;

  try {
    headModel.findOneAndDelete({ _id: id }).then(() => {
      res.json({
        status: true,
        result: "successfully deleted",
      });
    });
  } catch (error) {
    res.json({
      status: true,
      result: error.message,
    });
  }
});

module.exports = router;
