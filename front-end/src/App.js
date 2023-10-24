import React, { useEffect, useState } from "react";
import Login from "./components/login";
import { Route, Routes } from "react-router-dom";
import Register from "./components/register";
import Employe from "./components/employe/employe";
import EmployeeDetails from "./components/employe/employeeDetails";
import Department from "./components/department/department";
import Dep_head from "./components/head/dep-head";
import DepDetails from "./components/department/depDetails";
import HeadDetails from "./components/head/headDetails";
import Header from "./components/header";
import { useSelector } from "react-redux";
 
 

function App() {
  const isAuth  = useSelector((state)=>state.admin.isAuth)

  return (
    <div>
      <>
       
           
            {isAuth ?
            <>
              <Header />
              <Routes>
                <Route exact path="/employe" element={<Employe/>}></Route>
                <Route
                  exact
                  path="/employe/:id"
                  element={<EmployeeDetails />}
                ></Route>
                <Route
                  exact
                  path="/department"
                  element={<Department />}
                ></Route>
                <Route
                  exact
                  path="/department/:id"
                  element={<DepDetails />}
                ></Route>
                <Route exact path="/departmentHead" element={<Dep_head />}></Route>
               
                <Route
                  exact
                  path="/departmentHead/:id"
                  element={<HeadDetails />}
                ></Route>
              </Routes> 
            </> : <>
               
            <Routes>
              <Route exact path="/" element={<Login />}></Route>
              <Route exact path="/register" element={<Register />}></Route>
            </Routes>  </>}
           
            </>
      </div>
  );
}

export default App;
