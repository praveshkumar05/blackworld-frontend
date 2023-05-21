import React, { useState } from "react";
import Layout from "../../components/Layout.js/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./register.css"
import { registerfunc } from "../../components/Layout.js/APIS/apicall";
import { useNavigate } from "react-router-dom";
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import VisibilityOffTwoToneIcon from '@mui/icons-material/VisibilityOffTwoTone';
const Register = () => {
  const [show,setShow]=useState(false);
  const [inputVal, setinputVal] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const navigate=useNavigate();
  const setvalue = async (e) => {
    const { name, value } = e.target;
    setinputVal(() => {
      return { ...inputVal, [name]: value };
    });
  };
  const submitData = async (e) => {
    e.preventDefault();
    const { name, email, password, phone, address} = inputVal;
    if ( name === "" ||email === " " ||password === "" || phone === "" ||  address === " ") {
      toast.error("Please Fill All the Required Field");
    }
    else if(phone.length<10||phone.length>10){
      toast.error("please enter 10 digit phone number")

    }
    
    else {
      const Data = { name, email, password, phone, address};
      const config = {
        "Content-Type": "application/json",
      };
      const {data}= await registerfunc(Data, config);
     
      if (data.status === 201) {
        toast.success("You are successfully registered");
        navigate("/login")
      } else {
        alert(data.message);
      }
    }
  };
  return (
    <>
      <Layout>
      <ToastContainer />
        <div className="form-container">
          
          <form className="text-center">
            
            <h4 className="title text-danger "><strong > Register Here</strong></h4>
            <div className="mb-3">
              <input
                type="text"
                onChange={setvalue}
                name="name"
                className="form-control"
                required
                id="fullname"
                placeholder="Enter Your Name"
                autoFocus
              />
            </div>
            <div className="mb-3">
              
              <input
                type="email"
                onChange={setvalue}
                name="email"
                className="form-control"
                required
                id="exampleInputEmail1"
                placeholder="Enter Your Email"
              />
            </div>

            <div className="mb-3 d-flex">
              <input
                type= {show?"text":"password"}
                onChange={setvalue}
                name="password"
                className="form-control"
                required
                id="exampleInputPassword1"
                placeholder="password"
              />
               <strong style={{width:"50x",backgroundColor:""}}  >{show? <VisibilityTwoToneIcon onClick={()=>setShow(false)}/> : <VisibilityOffTwoToneIcon onClick={()=>setShow(true)}/>}</strong>
            </div>
            <div className="mb-3">
              <input
                type="text"
                onChange={setvalue}
                name="phone"
                className="form-control"
                required
                id="Phone"
                placeholder="Enter Your Phone Number"
              />
            </div>
            <div className="mb-3">
              <label> <strong>Enter your address</strong></label>
              <input
                type="text"
                onChange={setvalue}
                name="address"
                className="form-control"
                required
                id="add"
                placeholder="Enter Your Address"
              />
            </div>
        
            <div className="mb-3">
         <div>
        </div>

            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={submitData}
            >
              REGISTER
            </button>
            
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Register;
