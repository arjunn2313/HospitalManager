import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../reducer";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOut = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-primary">
        <div className="container-fluid">
          <a className="navbar-brand text-light " href="/employe">
            <h2 className="admin">Admin</h2>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse navigation " id="navbarNav">
            <ul className="navbar-nav   ">
              <li className="nav-item ">
                <Link to="/employe" className="nav-link" activeClassName="active-link">
                  Employe
                </Link>
              </li>
              <li className="nav-item" activeClassName="active-link">
                <Link to="/departmentHead" className="nav-link a ">
                  Department Head
                </Link>
              </li>
              <li className="nav-item ">
                <Link to="/department" className="nav-link" activeClassName="active-link">
                  Department
                </Link>
              </li>
            </ul>
          </div>
          <button className="btn btn-danger float-end " onClick={logOut}>Logout</button>
        </div>
      </nav>
    </>
  );
}
