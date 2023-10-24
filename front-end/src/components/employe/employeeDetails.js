import axios from "axios";
import React, { useState } from "react";
import { Link, redirect, useNavigate, useParams } from "react-router-dom";
import { RiChatDeleteLine } from "react-icons/ri";
import {
  employe_deleteurl,
  employe_updateurl,
  employe_singleurl,
  department_name,
  head_name,
  department_name_single,
  head_name_single,
} from "../../api";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
export default function EmployeeDetails() {
  const [data, setData] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [department, setDepartment] = useState([]);
  const [head, setHead] = useState([]);

  console.log(`console.log ${id}`);
  useState(() => {
    axios
      .get(`${employe_singleurl}/${id}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(department_name)
      .then((res) => {
        console.log(res.data.result);
        setDepartment(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(head_name)
      .then((res) => {
        console.log(res.data.result);
        setHead(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);


  const handleSee = (id) => {
    axios
      .get(`${department_name_single}/${id}`)
      .then((res) => {
        console.log(res.data.result._id);
        let id = res.data.result._id;
        navigate(`/department/${id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSeeH = (id) => {
    axios
      .get(`${head_name_single}/${id}`)
      .then((res) => {
        let id = res.data.result._id;
        navigate(`/departmentHead/${id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("age", data.age);
    formData.append("phone", data.phone);
    formData.append("description", data.description);
    formData.append("department", data.department);
    formData.append("departmentHead", data.departmentHead);
    if (data.image) {
      formData.append("image", data.image[0]);
    }
    axios
      .post(`${employe_updateurl}/${id}`, formData)
      .then((res) => {
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDelete = () => {
    axios
      .delete(`${employe_deleteurl}/${id}`)
      .then((res) => {
        console.log(res);
        navigate("/employe");
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
    {/* ***********EMPLOYE PROFILE************** */}
      <div className="profile bg-light border">
        <div className="row">
          <div className="col-8">
            <h1 className="ms-3 mt-2">Profile Details</h1>
          </div>
          <div className="col-4   text-center">
            <button
              className="btn btn-success mt-3"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Edit <BiEdit />
            </button>
            <button
              className="btn btn-danger mt-3 ms-3"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              Delete
              <AiOutlineDelete />
            </button>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-7">
            <table className="table profile-table">
              <tbody>
                <tr>
                  <th>Employe Number</th>
                  <td></td>
                  <td>{data.phone}</td>
                </tr>
                <tr scope="row">
                  <th>age</th>
                  <td></td>
                  <td>{data.age}</td>
                </tr>
                <tr scope="row">
                  <th>Department</th>
                  <td></td>
                  <td>
                    {data.department}
                    <Link
                      className="ms-3"
                      style={{ textDecoration: "none" }}
                      onClick={() => handleSee(data.department)}
                    >
                      View Department
                    </Link>{" "}
                  </td>
                </tr>
                <tr scope="row">
                  <th>Department Head</th>
                  <td></td>
                  <td>
                    {data.departmentHead}
                    <Link
                      className="ms-3"
                      style={{ textDecoration: "none" }}
                      onClick={() => handleSeeH(data.departmentHead)}
                    >
                      View Profile
                    </Link>
                  </td>
                </tr>
                <tr scope="row">
                  <th>About Employe</th>
                  <td></td>
                  <td>{data.description}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-4">
            <img
              className="d-block mx-auto mb-3 rounded-circle profile-img mt-4"
              src={`http://localhost:4000${data.image}`}
            />
            <h1 className="text-center">{data.name}</h1>
            <h4 className="text-center">Age - {data.age}</h4>
          </div>
        </div>
      </div>

      {/* //////////// Editing Form ////////////// */}

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog profile-edit-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit details
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-1">
                <label className="form-label mb-1">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
              </div>
              <div className="mb-1">
                <label className="form-label mb-1">Age</label>
                <input
                  type="text"
                  className="form-control"
                  value={data.phone}
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                />
              </div>

              <div className="mb-1">
                <label className="form-label mb-1">Employe Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={data.age}
                  onChange={(e) => setData({ ...data, age: e.target.value })}
                />
              </div>

              <div className="mb-1">
                <label className="form-label mb-1">Department</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) =>
                    setData({ ...data, department: e.target.value })
                  }
                  value={data.department}
                >
                  {department.map((i, k) => (
                    <option value={i.departmentName}>{i.departmentName}</option>
                  ))}
                </select>
              </div>

              <div className="mb-1">
                <label className="form-label mb-1">Department Head</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) =>
                    setData({ ...data, departmentHead: e.target.value })
                  }
                  value={data.departmentHead}
                >
                  {head.map((i, k) => (
                    <option value={i.name}>{i.name}</option>
                  ))}
                </select>
              </div>

              <div className="mb-1">
                <label className="form-label mb-1">Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setData({ ...data, image: e.target.files })}
                />
              </div>

              <div className="mb-1">
                <label className="form-label mb-1">Description</label>
                <textarea
                  type="text"
                  className="form-control"
                  value={data.description}
                  onChange={(e) =>
                    setData({ ...data, description: e.target.value })
                  }
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

       {/* ***********DELETE MODAL************** */}

      <div
        className="modal fade "
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                <RiChatDeleteLine style={{ color: "red" }} /> Delete Employe
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete {data.name} ?
            </div>
            <div class="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
