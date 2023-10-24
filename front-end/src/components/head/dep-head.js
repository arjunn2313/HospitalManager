import React, { useState, useEffect } from "react";
import { department_name, head_add, head_all } from "../../api";
import axios from "axios";
import { useNavigate, Link, redirect } from "react-router-dom";


export default function Department() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [addNew, setAddNew] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [age, setAge] = useState("");
  const [departmentName, setDepartmentName] = useState([]);
  const [department, setDepartment] = useState("");
  const [error, setError] = useState("");
  
  useEffect(() => {
    axios
      .get(head_all)
      .then((res) => {
        setData(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(department_name)
      .then((res) => {
        console.log(res.data.result);
        setDepartmentName(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleView = (id) => {
    navigate(`/departmentHead/${id}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = {};
    if (!name) {
      error.name = "please enter name";
      alert("please enter name");
    }
    if (!number) {
      error.year = "Please enter department founded year";
      alert("Please enter department founded year");
    }
    if (!age) {
      error.year = "Please enter department founded year";
      alert("Please enter department founded year");
    }
    if (!description) {
      error.description = "Please enter description";
      alert("Please enter description");
    }

    if (Object.keys(error).length > 0) {
      setError(error);
    } else {
      let AddedDetails = {
        name: name,
        number: number,
        age: age,
        image: image,
        description: description,
        department: department,
      };
      const formData = new FormData();
      for (const key in AddedDetails) {
        formData.append(key, AddedDetails[key]);
      }

      axios
        .post(head_add, formData)
        .then((res) => {
          console.log("Department added successfully");
         window.location.reload(false)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className="container-fluid bg-light">
        <div className="row">
          <div className="col-3 text-center mt-2">
            <h2 className="header">Department Head</h2>
          </div>
          <div className="col-6"></div>
          <div className="col-3 text-center mt-3">
            <div className="d-grid mx-auto col-4">
              <button
                className="btn btn-success"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => setAddNew(!addNew)}
              >
                Add
              </button>
            </div>
          </div>
        </div>
        <div className="Head-card">
          <div className="row">
            {data.map((head, k) => (
              <div className="col-3 g-3">
                <div className="card" style={{ width: "18rem" }}>
                  <img
                    src={`http://localhost:4000${head.image}`}
                    className="card-img-top d-block mt-1 mx-auto rounded-circle"
                    alt="..."
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{head.name}</h5>
                    <p className="card-text">Employe Number - {head.number}</p>
                    <button
                      onClick={() => handleView(head._id)}
                      className="btn btn-primary"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/*////////////////////// Add Department Head////////////////*/}
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                New Employe
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="Employee Number"
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="age"
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setImage(e.target.files[0])}
                    placeholder="image"
                  />
                </div>
                <div className="mb-2">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="department"
                    va
                    onChange={(e) => setDepartment(e.target.value)}
                  >
                    <option>Select Department</option>
                    {departmentName.map((i, k) => (
                      <option value={i.departmentName}>
                        {i.departmentName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-2">
                  <textarea
                    type="text"
                    className="form-control"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="modal-footer">
                  <button
                    type="submit"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" class="btn btn-primary">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
