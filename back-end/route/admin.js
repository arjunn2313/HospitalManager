const router = require("express").Router();
const { async } = require("q");
const adminModel = require("../model/adminSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ADMIN REGISTRATION

router.post("/register", (req, res) => {
  try {
    let { name, email, phone, password } = req.body;
    // console.log(name)
    adminModel.find({ email: email }).then(async (data) => {
      if (data && data.length > 0) {
        res.json({
          status: false,
          message: "Email already exist",
        });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        adminModel
          .create({
            name: name,
            email: email,
            phone: phone,
            password: hashedPassword,
          })
          .then(() => {
            res.json({
              status: true,
              message: "Registration Success",
            });
          })
          .catch((err) => {
            res.json({
              status: true,
              message: err.message,
            });
          });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

// router.post("/login", (req, res) => {
//   try {
//     let { email, password } = req.body;
//     adminModel.findOne({ email: email }).then(async (data) => {
//       if (data) {
//         const passMatch = await bcrypt.compare(password, data.password);
//         if (passMatch) {
//           res.status(200).json({
//             status: true,
//             message: "successfully loggedin",
//           });
//         } else {
//           res.status(404).json({
//             status: false,
//             message: "password mismatch",
//           });
//         }
//       } else {
//         res.status(404).json({
//           status: false,
//           message: "user not found",
//         });
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

// Admin login
router.post("/login", (req, res) => {
  try {
    let { email, password } = req.body;
    adminModel.findOne({ email: email }).then(async (data) => {
      if (data) {
        const passMatch = await bcrypt.compare(password, data.password);
        if (passMatch) {
          const token = jwt.sign(
            {
              userId: data._id,
              email: data.email,
            },
            "123",
            { expiresIn: "2h" }
          );

          res.status(200).json({
            status: true,
            message: "successfully logged in",
            token: token,
          });
        } else {
          res.status(404).json({
            status: false,
            message: "password mismatch",
          });
        }
      } else {
        res.status(404).json({
          status: false,
          message: "user not found",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
