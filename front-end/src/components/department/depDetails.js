import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { RiChatDeleteLine } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import {
  department_deleteurl,
  department_singleurl,
  department_updateurl,
  head_name_single,
  employe_name_single,
} from "../../api";
import { useEffect } from "react";

export default function DepDetails() {
  const [data, setData] = useState("");
  const { id } = useParams();
  const [isEditing, setEditing] = useState(false);
  const navigate = useNavigate();
  const [dp, setDp] = useState("");
  const [head, setHead] = useState("");
  const [employe, setEmploye] = useState("");

  console.log(`console.log ${id}`);
  useState(() => {
    // Fetching detailed Page
    axios
      .get(`${department_singleurl}/${id}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data.result);
        setDp(res.data.result.departmentName);
        console.log(`haha${res.data.result.departmentName}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/head/departmentname/${dp}`)
      .then((res) => {
        console.log(res.data.result.name);
        setHead(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`http://localhost:4000/employe/departmentname/${dp}`)
      .then((res) => {
        console.log(res.data.result.name);
        setEmploye(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const handleEdit = () => {
    setEditing(true);
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

  const handleSee =(id)=> {
    axios
      .get(`${employe_name_single}/${id}`)
      .then((res) => {
        console.log(res.data.result._id);
        let id = res.data.result._id;
        navigate(`/employe/${id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append("departmentName", data.departmentName);
    formData.append("year", data.year);
    formData.append("description", data.description);
    if (data.image) {
      formData.append("departmentImage", data.image[0]);
    }
    axios
      .post(`${department_updateurl}/${id}`, formData)
      .then((res) => {
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = () => {
    axios
      .delete(`${department_deleteurl}/${id}`)
      .then((res) => {
        console.log(res);
        navigate("/department");
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="profile bg-light border">
        <div className="row">
          <div className="col-8">
            <h1 className="ms-3 mt-2">{data.departmentName}</h1>
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
                  <th>Founded Year</th>
                  <td></td>
                  <td>{data.year}</td>
                </tr>

                <tr scope="row">
                  <th>Department Head</th>
                  <td></td>
                  <td>
                    {head.name}
                    <span>
                      <img
                        src={`http://localhost:4000${head.image}`}
                        style={{ width: "100px", height: "100px" }}
                      />
                    </span>
                    <Link
                      className="ms-3"
                      style={{ textDecoration: "none" }}
                      onClick={() => handleSeeH(head.name)}
                    >
                      View Profile
                    </Link>
                  </td>
                </tr>
                 <tr scope="row">
                  <th>Employe</th>
                  <td></td>
                  <td>
                    {employe.name}
                    <span>
                      <img
                        src={`http://localhost:4000${employe.image}`}
                        style={{ width: "100px", height: "100px" }}
                      />
                    </span>
                    <Link
                      className="ms-3"
                      style={{ textDecoration: "none" }}
                      onClick={() => handleSee(employe.name)}
                    >
                      View Profile
                    </Link>
                  </td>
                </tr> 
                <tr scope="row">
                  <th>About Department</th>
                  <td></td>
                  <td>{data.description}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-4">
            <img
              className="d-block mx-auto mb-3  profile-img mt-4"
              src={`http://localhost:4000${data.departmentImage}`}
            />
          </div>
        </div>
      </div>

      {/* Edit */}
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
                <input
                  type="text"
                  className="form-control"
                  value={data.departmentName}
                  onChange={(e) =>
                    setData({ ...data, departmentName: e.target.value })
                  }
                />
              </div>
              <div className="mb-1">
                <input
                  type="text"
                  className="form-control"
                  value={data.year}
                  onChange={(e) => setData({ ...data, year: e.target.value })}
                />
              </div>

              <div className="mb-1">
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setData({ ...data, image: e.target.files })}
                />
              </div>

              <div className="mb-1">
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
              Are you sure you want to delete {data.departmentName} ?
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
