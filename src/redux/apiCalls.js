import { loginFailure, loginStart, loginSuccess, logout } from "./userRedux";
import { publicRequest } from "../requestMethods";
import {
  registerFailure,
  registerStart,
  registerSuccess,
} from "./registerRedux";

import axios from "axios";
import { logoutCart } from "./cartRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const register = async (dispatch, user) => {
  //console.log("Data", user);
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    //const res = await axios.post("http://localhost:5000/api/auth/register");
    // console.log("apiCalls", res.data);
    dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFailure(err.response.data.keyValue));
    
  }
};

export const logOut = (dispatch) => {
  dispatch(logout());
  dispatch(logoutCart());
  //localStorage.removeItem("Storage");
  //window.localStorage.clear();
  //console.log(localStorage);
  //window.location.reload(false);
};
