import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const errors = {};

    if (!name) {
      errors.name = "**name is required";
    }
    if (!email) {
      errors.email = "**email is required";
    }
    if (!phone) {
      errors.phone = "**phone is required";
    }
    if (!password) {
      errors.password = "**password is required";
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
    } else {
      let adminDetails = {
        name: name,
        email: email,
        phone: phone,
        password: password,
      };
      axios
        .post("http://localhost:4000/admin/register", adminDetails)
        .then((res) => {
          if (res.data.status) {
            console.log("submitted");
            alert("succefully Registerd");
            navigate("/");
          } else {
            alert("User already exsist");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("User already exsist");
        });
    }
  };

  return (
    <>
      <div className="container border">
        <div className="register-container border">
          <h2 className="text-center mt-3 mb-4">Admin Registration</h2>
          <form className="form row g-3 " onSubmit={handleRegister}>
            <div className="col-8 mx-auto d-flex">
              <input
                type="text"
                className="form-control-lg form-control"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <span style={{ color: "red" }}>{error && error.name}</span>
            </div>

            <div className="col-8 mx-auto d-flex">
              <input
                type="email"
                className="form-control-lg form-control"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span style={{ color: "red" }}>{error && error.email}</span>
            </div>

            <div className="col-8 mx-auto d-flex">
              <input
                type="tel"
                className="form-control-lg form-control"
                placeholder="phone"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
              <span style={{ color: "red" }}>{error && error.phone}</span>
            </div>

            <div className="col-8 mx-auto d-flex">
              <input
                type="password"
                className="form-control-lg form-control"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span style={{ color: "red" }}>{error && error.password}</span>
            </div>
            <div className="col-12">
              <div className="d-grid mx-auto col-6">
                <button type="submit" className="btn btn-success">
                  Register
                </button>
              </div>
            </div>
            <div className="col-6"></div>
            <div className="col-6">
              <Link to="/">already have account? login</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
