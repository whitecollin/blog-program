import axios from "axios";
import {
  ADD_BLOG,
  BASE_URL,
  EDIT_BLOG,
  DELETE_BLOG,
  ADD_LIKE,
  WATCH_BLOG,
  READ_BLOG,

} from "./constants";
import { AppDispatch } from "../app/store";

export const readBlog = () => (dispatch: AppDispatch) => {
  axios
    .get(`${BASE_URL}/api/blog/read`)
    .then((res) => {
      dispatch({
        type: READ_BLOG,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
export const readByDate = () => (dispatch: AppDispatch) => {
  axios
    .get(`${BASE_URL}/api/blog/date`)
    .then((res) => {
      dispatch({
        type: READ_BLOG,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
export const readByLike = () => (dispatch: AppDispatch) => {
  axios
    .get(`${BASE_URL}/api/blog/bylike`)
    .then((res) => {
      dispatch({
        type: READ_BLOG,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
export const readByWatch = () => (dispatch: AppDispatch) => {
  axios
    .get(`${BASE_URL}/api/blog/bywatch`)
    .then((res) => {
      dispatch({
        type: READ_BLOG,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const addBlog = (blogdata: Object) => (dispatch: AppDispatch) => {
  axios
    .post(`${BASE_URL}/api/blog/add/`, blogdata)
    .then((res) => {
      dispatch({
        type: ADD_BLOG,
        payload: res.data,
      });
    })
    .catch((err) => {});
};

export const editBlog = (blogdata: Object) => (dispatch: AppDispatch) => {
  axios
    .put(`${BASE_URL}/api/blog/edit`, blogdata)
    .then((res) => {
      dispatch({
        type: EDIT_BLOG,
        payload:blogdata
      });
    })
    .catch((err) => {});
};

export const deleteBlog = (id:string) => (dispatch: AppDispatch) => {
  axios
    .delete(`${BASE_URL}/api/blog/delete/${id}`)
    .then((res) => {
      dispatch({
        type: DELETE_BLOG,
        payload: id,
      });
    })
    .catch((err) => {});
};

export const addlike = (id:string) => (dispatch: AppDispatch) => {
  axios
    .get(`${BASE_URL}/api/blog/like/${id}`, )
    .then((res) => {
      dispatch({
        type:ADD_LIKE,
        payload:id
      })
    })
    .catch((err) => {});
};
export const watchblog = (id:string) => (dispatch: AppDispatch) => {
  axios
    .put(`${BASE_URL}/api/blog/watch/${id}`)
    .then((res) => {
      dispatch({
        type:WATCH_BLOG,
        payload:id
      })
    })
    .catch((err) => {});
};
