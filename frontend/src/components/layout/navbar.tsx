import React, { FormEvent } from "react";
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { logoutUser } from "../../action/authAction";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const Navbar = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };
  
  return (
    <>
      <div className=" bg-green-500 flex justify-between sticky top-0">
        <div className="flex">
          <Link className="p-3 hover:text-white text-lg" to="/blog">
            Blog
          </Link>
          <Link className="p-3 hover:text-white text-lg" to="/myblog">
            MyBlog
          </Link>
        </div>
        <div className="flex">
          {auth.isauth ? (
            <button className="p-3 hover:text-white text-lg" onClick={logout}>
              {auth.user.name} Logout
            </button>
          ) : (
            <>
              <Link className="p-3 hover:text-white text-lg" to="/login">
                Login
              </Link>
              <Link className="p-3 hover:text-white text-lg" to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
