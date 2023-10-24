const router = require("express").Router();
const departmentModel = require("../model/departmentSchema");
const { departmentStorage } = require("../middleware/middleware");
const multer = require("multer");
const upload = multer({ storage: departmentStorage });
// GET ALL DEPARTMENT

router.get("/", (req, res) => {
  try {
    departmentModel
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
    departmentModel
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
router.get("/singleName/:id", (req, res) => {
  try {
    let id = req.params.id;
    departmentModel
      .findOne({ departmentName: id })
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

router.post("/add", upload.single("departmentImage"), (req, res) => {
  try {
    let { departmentName, year, description } = req.body;
    console.log(req.file);
    console.log(req.body);
    departmentModel
      .create({
        departmentName: departmentName,
        departmentImage: "/uploads/department/" + req.file.filename,
        year: year,
        description: description,
      })
      .then(() => {
        res.status(200).json({
          status: true,
          message: "new department created",
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

router.get("/departmentNames", (req, res) => {
  try {
    departmentModel
      .find({}, { departmentName: 1 })
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

//  EDIT

router.post("/update/:id", upload.single("departmentImage"), (req, res) => {
  let { departmentName, year, description } = req.body;
  const updateObj = {};
  if (req.file) {
    updateObj.departmentImage = "/uploads/department/" + req.file.filename;
  }
  if (departmentName) updateObj.departmentName = departmentName;

  if (year) updateObj.year = year;
  if (description) updateObj.description = description;

  try {
    departmentModel
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
    departmentModel.findOneAndDelete({ _id: id }).then(() => {
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
