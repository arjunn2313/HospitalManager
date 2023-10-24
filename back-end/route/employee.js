const router = require("express").Router();
const employeModel = require("../model/employeSchema");
const { emplostorage } = require("../middleware/middleware");
const multer = require("multer");
const upload = multer({ storage: emplostorage });

// GET ALL employe

router.get("/", (req, res) => {
  try {
    employeModel
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

//  ADD EMPLOYEE

router.post("/add", upload.single("image"), (req, res) => {
  try {
    let { name, age, phone, description,department,departmentHead } = req.body;
    console.log(req.file);
    employeModel
      .create({
        name: name,
        age: age,
        phone: phone,
        image: "/uploads/employe/" + req.file.filename,
        description: description,
        department :department,
        departmentHead :departmentHead
      })
      .then(() => {
        res.status(200).json({
          status: true,
          message: "New employe added",
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

// EDIT
router.post("/update/:id",upload.single("image"),(req, res) => {
  let { name, age, phone, description,department,departmentHead } = req.body;
  const updateObj = {};
  if (req.file) {
    updateObj.image = "/uploads/employe/" + req.file.filename;
  }
  if (name) updateObj.name = name;
  if (age) updateObj.age = age;
  if (phone) updateObj.phone = phone;
  if (description) updateObj.description = description;
  if(department) updateObj.department =department;
  if(departmentHead) updateObj.departmentHead = departmentHead

  try {
    employeModel
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
router.get('/single/:id',(req,res)=>{
  try {
    let id = req.params.id
    employeModel.findOne({_id:id}).then((data)=>{
      res.status(200).json({
        status: true,
         result:data
      });
    }).catch((err)=>{
      res.status(404).json({
        status: false,
        message: err.message,
      });
    })
  } catch (error) {
    console.log(error)
  }
})

router.get("/departmentname/:id", (req, res) => {
  try {
    let id = req.params.id;
    employeModel
      .findOne({department: id })
      .then((data) => {
        res.status(200).json({
          status:true,
          result:data,
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
    employeModel
      .findOne({ name : id })
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


 
// DELETE

router.delete("/delete/:id", (req, res) => {
  let id = req.params.id;

  try {
    employeModel.findOneAndDelete({ _id: id }).then(() => {
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
