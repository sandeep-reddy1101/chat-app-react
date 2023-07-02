import React from "react";
import "./login.css";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { verifyUserLogin } from "../../services/get";
import { useDispatch } from "react-redux";
import { login } from "../../store";
import { setUserInfoToLocal } from "../../services/localStorage";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    phoneNo: yup
      .string()
      .matches("^[0-9]{10}$", "Phone number is not valid")
      .required("phone no is required"),
    password: yup.string().required("Password is required").min(8),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const formSubmit = (data) => {
    verifyUserLogin(data.phoneNo, data.password).then((backendResponse) => {
      if (backendResponse.flag) {
        const userData = backendResponse.data[0];
        const actionPayload = {
          login: true,
          phoneNo: userData.phoneNo,
          userId: userData._id,
          firstName: userData.firstName,
          lastName: userData.lastName,
          chats: userData.chats,
          contacts: userData.contacts,
        };
        dispatch(login(actionPayload));
        setUserInfoToLocal(JSON.stringify({login: true, userId: userData._id}));
        navigate("/");
      } else {
        console.log(
          "some error occured in the backend >>> ",
          backendResponse.message
        );
      }
    });
  };

  return (
    <div>
      <div className="login-form">
        <form className="form" onSubmit={handleSubmit(formSubmit)}>
          <p className="form-title">Sign in to your account</p>
          <div className="input-container">
            <input
              type="text"
              placeholder="Enter phone number"
              {...register("phoneNo")}
            />
            <small className="text-danger">{errors.phoneNo?.message}</small>
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Enter password"
              {...register("password")}
            />
            <small className="text-danger">{errors.password?.message}</small>
          </div>
          <input type="submit" className="submit mt-2" value={"Sign In"} />

          <p className="signup-link mt-1">
            No account?
            <Link to={"/signup"}>Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;