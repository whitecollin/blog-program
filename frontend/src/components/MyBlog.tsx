import React, { useState, FormEvent, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { useAppDispatch } from "../app/hooks";
import { deleteBlog, editBlog } from "../action/blogAction";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import { readBlog } from "../action/blogAction";
import { TextareaAutosize } from "@mui/material";
import { useNavigate } from "react-router-dom";
const MyBlog = () => {

  const blogs = useSelector((state: RootState) => state.blog.blogs);
  const user = useSelector((state: RootState) => state.auth.user);
  const isauth = useSelector((state: RootState) => state.auth.isauth);
  const dispatch = useAppDispatch();
  const [currentEdit, setcurrentEdit] = useState({
    title: "",
    content: "",
    _id: "",
  });
  const navigate=useNavigate();
  useEffect(() => {
    if (!isauth) navigate("/login");
    dispatch(readBlog());
  }, [isauth,dispatch,navigate]);

  const del = (e: React.MouseEvent<SVGSVGElement, MouseEvent>, id: string) => {
    if (window.confirm()) {
      dispatch(deleteBlog(id));
    }
  };

  const onedit = (e: FormEvent) => {
    e.preventDefault();
    if (currentEdit.title !== "" && currentEdit.content !== "") {
      dispatch(editBlog(currentEdit));
    }
  };
  
  return (
    <>
      <div className=" max-w-5xl m-auto flex">
        <div className="flex flex-wrap">
          {blogs.map((item, key) => {
            return (
              <>
                {item.user_name === user.name && (
                  <div className=" border-2 border-cyan-300 border-l-[6px] p-3 border-l-red-500 m-3 w-[300px]">
                    <div className="detail right-0 bottom-0">
                        <div className="flex justify-between">
                          {item.user_name}'article
                        </div>
                        <div className="ms-5  text-xl">Title: {item.title}</div>
                      </div>
                    <div className="flex justify-end">
                      <EditIcon
                        className="hover:cursor-pointer"
                        onClick={(e) => setcurrentEdit(item)}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      ></EditIcon>
                      <DeleteIcon
                        className="hover:cursor-pointer"
                        onClick={(e) => del(e, item._id)}
                      ></DeleteIcon>
                    </div>
                    <div className="image">
                        {item.image !== "" && (
                          <img
                            src={`http://localhost:8000/${item.image}`}
                            className="my-4"
                            alt={`localhost:8000/${item.image}`}
                          />
                        )}
                      </div>
                  </div>
                  
                )}
              </>
            );
          })}
        </div>
      </div>
      {/* Edit Modal */}

      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Blog
              </h1>
            </div>
            <div className="modal-body">
              <form onSubmit={onedit}>
                <div className="mx-4 mt-6">
                  <TextField
                    className="w-full"
                    name="title"
                    id="outlined-basic"
                    label="title"
                    variant="outlined"
                    value={currentEdit.title}
                    onChange={(e) =>
                      setcurrentEdit({
                        ...currentEdit,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                  <TextareaAutosize
                    className="border-red-300 border-2 w-full my-3 p-3"
                    name="content"
                    minRows="4"
                    value={currentEdit.content}
                    onChange={(e) =>
                      setcurrentEdit({
                        ...currentEdit,
                        [e.target.name]: e.target.value,
                      })
                    }
                  ></TextareaAutosize>
                  <Button
                    type="submit"
                    variant="contained"
                    className="ms-32"
                    onClick={onedit}
                    data-bs-dismiss="modal"
                  >
                    Update blog
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MyBlog;
