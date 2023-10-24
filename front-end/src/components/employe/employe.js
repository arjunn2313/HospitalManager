import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { department_name, employe_add, employe_all, head_name } from "../../api";
import { GrFormView } from "react-icons/gr";

export default function Employe( ) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [department,setDepartment] = useState([])
  const [head,setHead] =useState([])
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    image: null,
    description: "", 
    department : "",
    departmentHead:"",
  });
  const [addNew,setAddNew] = useState(false)

  useEffect(() => {
    axios.get(employe_all).then((res) => {
      setData(res.data.message);
      console.log(res.data.message);
    });
    
    axios.get(department_name).then((res)=>{
      console.log(res.data.result)
      setDepartment(res.data.result)
    }).catch((err)=>{
      console.log(err)
    })
    axios.get(head_name).then((res)=>{
      console.log(res.data.result)
      setHead(res.data.result)
    }).catch((err)=>{
      console.log(err)
    })
  }, []);

  const handleView = (id) => {
    navigate(`/employe/${id}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
   
    const formDataToSubmit = new FormData();
    for (const key in formData) {
      formDataToSubmit.append(key, formData[key]);
    }
  
    axios
      .post( employe_add, formDataToSubmit)
      .then((res) => {
        console.log("Employee added successfully");
        navigate('/employe')
        window.location.reload(false)
        setFormData({
          name: "",
          age: "",
          phone: "",
          image: null,
          description: "",
          department:'',
          departmentHead:""
        });
      })
      .catch((err) => {
        console.error("Error adding employee:", err);
      });
  };
  return (
    <div className="container-fluid bg-light">
     

    
        <div className="row">
          <div className="col-3 text-center mt-2">
            <h2 className="header">Employe</h2>
          </div>
          <div className="col-6">
          
          </div>
          <div className="col-3 text-center mt-3">
            <div className="d-grid mx-auto col-4">
            <button
              className="btn btn-success"
              type="button"
              data-bs-toggle="modal" data-bs-target="#exampleModal"
              onClick={() => setAddNew(!addNew)}
            >
              Add 
            </button>
            </div>
          
          </div>
        </div>
        <table class="table text-center mt-2">
          <thead>
            <tr className="">
              
              <th scope="col">Name</th>
              <th scope="col">Employe Number</th>
              <th scope="col"></th>
              <th scope="col">Image</th>
              <th scope="col"></th>
              
            </tr>
          </thead>

          <th scope="row"></th>
          {data.map((item, ind) => (
            <tbody className="text-ceter">
              <tr>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td> </td>
                
                <td>
                  <img
                    className="tableimage rounded-circle "
                    src={`http://localhost:4000${item.image}`}
                  />
                </td>
                <td> <GrFormView  id='view' title="view" onClick={()=>handleView(item._id)}/></td>
              </tr>
            </tbody>
          ))}
        </table>
       

{/* ////////////Add Employee///////////////// */}
 
<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">New Employe</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
      
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
        />
        </div>
        <div className="mb-2">
      
        <input
          type="number"
          className="form-control"
          id="age"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
        />
      </div>
      <div className="mb-2" >
        
        <input
          type="text"
          className="form-control"
          id="phone"
          placeholder="Employe Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      <div className="mb-2" >
        
        <select className="form-select" aria-label="Default select example"
         name="department"  
         value={formData.department}  
         onChange={handleChange}
        >
            <option>Select Department</option>
          {department.map((i,k)=>(
               <option value={i.departmentName} 
               >{i.departmentName}</option>
          ))}
          </select>
      </div>
      <div className="mb-2">
              <select className="form-select" aria-label="Default select example"
        name="departmentHead"  
        value={formData.departmentHead}  
        onChange={handleChange}
        >
          <option>Select Department Head</option>
          {head.map((i,k)=>(
            
               <option value={i.name} 
               >{i.name}</option>
          ))}
          </select>
      </div>
      <div className="mb-2" >
        
        <input
          type="file"
          className="form-control"
          id="image"
          name="image"
          onChange={handleImageChange}
        />
      </div>
      <div className="mb-2" >
        
        <textarea
          className="form-control"
          placeholder="Description"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      
      <div className="modal-footer">
        <button type="submit" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
      </form>
      </div>
    
    </div>
  </div>
</div>
    </div>
  );
}
