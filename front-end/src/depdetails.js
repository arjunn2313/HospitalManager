import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EmployeeDetails(props) {
  const [data, setData] = useState("");
  const { id } = useParams();
  const [isEditing, setEditing] = useState(false);
  const navigate = useNavigate()

  console.log(`console.log ${id}`);
  useState(() => {
    axios
      .get(`http://localhost:4000/dep/single/${id}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    axios
      .post(`http://localhost:4000/employe/update/${id}`, {
        name: data.name,
        age: data.age,
        phone: data.phone,
        description: data.description,
        
      })
      .then((res) => {
        setEditing(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = () => {
   
    axios.delete(`http://localhost:4000/employe/delete/${id}`)
      .then((res) => {
       alert('deleted')
        navigate('/home')
      })
      .catch((err) => {
        console.log(err)
      });
  };
  return (
    <>
      <div className="container">
        <h1>{props.name}</h1>
        <div className="row">
          <div className="col-6">
            {isEditing ? (
              <button
                className="btn btn-success mb-4 mt-4"
                onClick={handleSave}
              >
                Save
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleEdit}>
                Edit
              </button>
            )}
            <button className="btn btn-danger mb-4 mt-4" onClick={handleDelete}>Delete</button> 
            <h1>
              {isEditing ? (
                <input
                  type="text"
                  className="form-control"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
              ) : (
                data.name
              )}
            </h1>
            <h4>
              {isEditing ? (
                <input
                  type="text"
                  className="form-control"
                  value={data.age}
                  onChange={(e) => setData({ ...data, age: e.target.value })}
                />
              ) : (
                data.age
              )}
            </h4>
            <h4>
              {isEditing ? (
                <input
                  type="text"
                  className="form-control"
                  value={data.phone}
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                />
              ) : (
                data.phone
              )}
            </h4>
            <h4>
              {isEditing ? (
                <input
                  type="text"
                  className="form-control"
                  value={data.description}
                  onChange={(e) =>
                    setData({ ...data, description: e.target.value })
                  }
                />
              ) : (
                data.description
              )}
            </h4>
          </div>
          <div className="col-6">
          {isEditing ? (
                <input
                  type="file"
                  className="form-control"
                  // value={`http://localhost:4000${data.image}`}
                  // onChange={(e) => setData({ ...data, phone: e.target.value })}
                />
              ) : (
                <img src={`http://localhost:4000${data.image}`} />
              )}
          </div>
        </div>
      </div>
    </>
  );
}
