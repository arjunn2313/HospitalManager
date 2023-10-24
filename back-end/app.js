const express = require("express");
const app = express();
const mongoose = require('mongoose')
const bodyParsser = require("body-parser");
const adminRout = require('./route/admin')
const uri ="mongodb+srv://arjunnks123:hospital@hospital.t0sxgrw.mongodb.net/?retryWrites=true&w=majority";
const employeRout = require('./route/employee')
const departmentRout = require('./route/department')
const departmentHead = require('./route/head')
const cors = require('cors')
const path = require('path')

app.use(bodyParsser.urlencoded({extended:false}))
app.use(bodyParsser.json())
app.use(cors())
app.use('/uploads',express.static(path.join(__dirname,'uploads')))



mongoose.connect(uri).then(res=>{
    console.log("connected to db")
}).catch((err)=>{
    console.log("error connecting to db")
})

app.use('/admin',adminRout)
app.use('/employe',employeRout)
app.use('/department',departmentRout)
app.use('/head',departmentHead)


app.listen(4000, (error) => {
  if (error) throw error;

  console.log("server start running in localhost//:4000");
});
