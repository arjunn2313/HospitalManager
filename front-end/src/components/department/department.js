import React, { useState, useEffect } from "react";
import { department_add, department_all } from "../../api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Department() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [addNew, setAddNew] = useState(false);
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  useState(() => {
    axios
      .get(department_all)
      .then((res) => {
        setData(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleView = (id) => {
    navigate(`/department/${id}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = {};
    if (!name) {
      error.name = "please enter name";
      alert("please enter name");
    }
    if (!year) {
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
        departmentName: name,
        departmentImage: image,
        year: year,
        description: description,
      };
      const formData = new FormData();
      for (const key in AddedDetails) {
        formData.append(key, AddedDetails[key]);
      }

      axios
        .post(department_add, formData)
        .then((res) => {
          console.log("Department added successfully");
           navigate("/department");
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
            <h2 className="header">Departments</h2>
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

        <div className="department-card">
          <div className="row">
            {data.map((head, k) => (
              <div className="col-6 g-4 text-center">
                <div className="card text-center" style={{ width: "31rem" }}>
                  <img
                    src={`http://localhost:4000${head.departmentImage}`}
                    className="card-img-top d-block mx-auto department"
                    id="department"
                    alt="..."
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{head.departmentName}</h5>
                    <button
                      onClick={() => handleView(head._id)}
                      className="btn btn-primary"
                    >
                      View Deparment
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ///////////////Add Deparment////////// */}

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
                    placeholder="Department Name"
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="Founded Year"
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
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
