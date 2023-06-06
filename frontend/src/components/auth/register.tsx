import React, { FormEvent } from "react";
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import {  useAppDispatch } from "../../app/hooks";
import { registerUser } from "../../action/authAction";
import { TypeRegisterData } from "../../action/actionType";
import { useNavigate } from "react-router-dom";
const Register = () => {

  const [userdata, setuserdata] = useState<TypeRegisterData>({
    name: "",
    email: "",
    password: "",
    repassword: "",
  });

  const dispatch = useAppDispatch();
  const navigate=useNavigate();
  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setuserdata({ ...userdata, [e.target.name]: e.target.value });
  };

  const onsubmit = (e: FormEvent) => {
    e.preventDefault();
    if(userdata.name!==''&&userdata.email!==''&&userdata.password!==''&&userdata.password===userdata.repassword){
      dispatch(registerUser(userdata,navigate));
      setuserdata({name:'',email:'',password:'',repassword:''})
    }
  };

  return (
    <>
      <form className="mt-52 " onSubmit={onsubmit}>
        <div className="w-[400px] m-auto pe-5 shadow-green-600 drop-shadow-md shadow-md p-1">
        <h2 className="text-center text-2xl">  Login</h2>
          <div className="w-full m-6">
            <TextField
              className="w-full"
              name="name"
              type="text"
              id="outlined-basic"
              label="Name:"
              variant="outlined"
              onChange={onchange}
            />
          </div>
          <div className="w-full m-6">
            <TextField
              className="w-full"
              name="email"
              id="outlined-basic"
              label="Email:"
              variant="outlined"
              onChange={onchange}
            />
          </div>
          <div className="w-full m-6">
            <TextField
              className="w-full"
              name="password"
              type="password"
              id="outlined-basic"
              label="Password:"
              variant="outlined"
              onChange={onchange}
            />
          </div>
          <div className="w-full m-6">
            <TextField
              className="w-full"
              name="repassword"
              type="password"
              id="outlined-basic"
              label="Re-password:"
              variant="outlined"
              onChange={onchange}
            />
          </div>
          <Button type="submit" variant="contained" className="" style={{margin:30}}>
            Register
          </Button>
        </div>
      </form>
    </>
  );
};

export default Register;
