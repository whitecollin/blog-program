import React, { useState, FormEvent, useEffect } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { TextField, Button } from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { useAppDispatch } from "../app/hooks";
import {
  addBlog,
  readBlog,
  addlike,
  watchblog,
  readByDate,
  readByWatch
  ,readByLike
} from "../action/blogAction";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import { TypeBlog } from "../action/actionType";
const Blog = () => {
  const isauth = useSelector((state: RootState) => state.auth.isauth);
  const user = useSelector((state: RootState) => state.auth.user);
  const blogs = useSelector((state: RootState) => state.blog.blogs);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
  const [imageData, setImageData] = useState<string | null>(null);
  const [currentblog, setcurrentblog] = useState<TypeBlog>({
    title: "",
    _id: "",
    like: 0,
    watch: 0,
    user_name: "",
    content: "",
    image: "",
    create_at:Date.now()
  });
  useEffect(() => {
    if (!isauth) navigate("/login");
    dispatch(readBlog());
  }, [isauth,navigate,dispatch]);
  
  const addlikee = (id: string) => {
    dispatch(addlike(id));
  };

  const sort=(e:any)=>{
  if(e.target.value==='1'){
    dispatch(readByDate());
  }else if(e.target.value==='2'){
    dispatch(readByLike());
  }else if(e.target.value==='3'){
    dispatch(readByWatch());
  }
 }
  const onadd = (e: FormEvent) => {
    e.preventDefault();
    if (title !== "" && content !== "") {
      const newblog = {
        title: title,
        content: content,
        user_name: user.name,
        image: imageData,
      };
      dispatch(addBlog(newblog));
      settitle("");
      setcontent("");
      setImageData("");
    }
  };

  const onwatch = (item: TypeBlog, id: string) => {
    if (item.user_name !== user.name) {
      dispatch(watchblog(id));
    }
    setcurrentblog(item);
  };

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageData(reader.result as string);
    };
  };
  return (
    <>
      <div className="container m-auto ">
        <div className="flex">
        <button
          type="button"
          className="btn bg-blue-700 m-4"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          NEW
        </button>
        <select className="form-select m-4 w-[200px]" onChange={(e)=>sort(e)} aria-label="Default select example">
          <option value="1" selected>Recent</option>
          <option value="2">Like</option>
          <option value="3">Watch</option>
        </select>
       
        </div>
        <div className="m-auto">
          <div className=" md:flex flex-wrap m-auto">
            {blogs.map((item, key) => {
              return (
                <>
                  <div
                    key={key}
                    className="w-[300px] border-2 border-cyan-300 border-l-[6px] p-3 border-l-red-500 m-3 flex flex-wrap relative"
                  >
                    <div
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal1"
                      onClick={(e) => onwatch(item, item._id)}
                      className=" hover:cursor-pointer tag-content"
                    >
                      <div className="detail right-0 bottom-0">
                        <div className="flex justify-between">
                          {item.user_name}'article
                          <div className="flex">
                            <VisibilityIcon></VisibilityIcon>
                            {item.watch}
                            <ThumbUpIcon></ThumbUpIcon>
                            {item.like}
                          </div>
                        </div>
                        <div className="ms-5  text-xl">Title: {item.title}</div>
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
                    <div className="flex justify-end">
                      {user.name !== item.user_name && (
                        <ThumbUpIcon
                          className="hover:cursor-pointer text-red-800"
                          onClick={(e) => addlikee(item._id)}
                        ></ThumbUpIcon>
                      )}
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {" "}
                <div className="ms-5">{currentblog.title}</div>
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {currentblog.image !== "" && (
                <img
                  src={`http://localhost:8000/${currentblog.image}`}
                  className="my-4"
                  alt={`localhost:8000/${currentblog.image}`}
                />
              )}
              Content:<div className="ms-5">{currentblog.content}</div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn bg-red-400"
                data-bs-dismiss="modal"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
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
                New Blog
              </h1>
            </div>
            <div className="modal-body">
              <form onSubmit={onadd}>
                <div className="mx-4 mt-6">
                  <TextField
                    className="w-full"
                    name="title"
                    id="outlined-basic"
                    label="title"
                    variant="outlined"
                    value={title}
                    onChange={(e) => settitle(e.target.value)}
                  />
                  <TextareaAutosize
                    className="border-red-300 border-2 w-full my-3 p-3"
                    minRows="4"
                    value={content}
                    onChange={(e) => setcontent(e.target.value)}
                  ></TextareaAutosize>
                  <input type="file" onChange={handleFileUpload} className="block mb-3" />
                  <Button
                    type="submit"
                    variant="contained"
                    className=""
                    onClick={onadd}
                    data-bs-dismiss="modal"
                  >
                    Add new blog
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
export default Blog;
