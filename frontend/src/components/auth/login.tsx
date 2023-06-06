import React, { FormEvent } from "react";
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import {useAppDispatch } from "../../app/hooks";
import { loginUser } from "../../action/authAction";
import { TypeLoginData } from "../../action/actionType";
import {useNavigate} from 'react-router-dom'
const Login = () => {

  const [userdata, setuserdata] = useState<TypeLoginData>({
    email:'',
    password: "",
  });
  const navigate=useNavigate();
  const dispatch = useAppDispatch();

  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setuserdata({ ...userdata, [e.target.name]: e.target.value });
  };

  const onsubmit = (e: FormEvent) => {
    e.preventDefault();
    if(userdata.email!==''&&userdata.password!==''){
      dispatch(loginUser(userdata,navigate));
      setuserdata({ ...userdata, email: "", password: "" });
    }
  };
  
  return (
    <>
      <form className=" mt-52 " onSubmit={onsubmit}>
        <div className="w-[400px] m-auto mt-8 shadow-2xl p-4">
        <h3 className=" font-bold text-3xl text-center">Login</h3>
          <div className=" m-2 my-4 ">
            <TextField
              className=" w-full"
              name="email"
              id="outlined-basic"
              label="Email:"
              variant="outlined"
              onChange={onchange}
            />
          </div>
          <div className="m-2 my-4">
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
          <Button type="submit" variant="contained" className="m-[30px]">
            login
          </Button>
        </div>
      </form>
    </>
  );
};

export default Login;
