import axios from "axios";
import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import NameP from "./store";
import { login } from "../reducer";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const error = {};

    if (!email) {
      error.email = "**name is required";
    }
    if (!password) {
      error.password = "**email is required";
    }
    if (Object.keys(error).length > 0) {
      setError(error);
    } else {
      let userAuth = {
        email: email,
        password: password,
      };
      axios
        .post("http://localhost:4000/admin/login", userAuth)
        .then((res) => {
          if (res.data.status) {
            console.log(res.data.token);
            dispatch(login())
            navigate("/employe");
          } else {
            error.server = res.data.message;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className="container">
        <div className="login-form border  ">
          <h2 className="text-center mt-4 mb-4">Admin Login</h2>
          <form className="row g-4 " onSubmit={handleLogin}>
            <div className="col-9 d-flex mx-auto">
              <input
                type="email"
                value={email}
                className="form-control-lg form-control"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
              />
              <span className="text-danger">{error && error.email}</span>
            </div>

            <div className="col-9 d-flex mx-auto ">
              <input
                type="password"
                value={password}
                className="form-control-lg form-control"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="text-danger">{error && error.password}</span>
            </div>
            <div className="col-12">
              <div className="d-grid mx-auto col-6">
                <button type="submit" className="btn btn-primary">
                  login
                </button>
              </div>
            </div>
            <div className="col-6"></div>
            <div className="col-6 text-center">
              <Link to="/register">New admin? Register</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
