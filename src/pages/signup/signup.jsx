import React from "react";
import "./signup.css";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { insertUser } from "../../services/post";


function Signup() {

  const navigate = useNavigate()

  const schema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    phoneNo: yup
      .string()
      .matches("^[0-9]{10}$", "Phone number is not valid")
      .required("phone no is required"),
    password: yup.string().required("Password is required").min(8),
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .min(8)
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const formSubmit = (data) => {
    insertUser(data.firstName, data.lastName, data.phoneNo, data.password).then(
      (backendResponse) => {
        if(backendResponse.flag){
          navigate('/login')
        }else{
          console.log("some error occured while creting the account", backendResponse.message)
        }
      }
    );
  };

  return (
    <div>
      <div className="signup-form">
        <form className="form" onSubmit={handleSubmit(formSubmit)}>
          <p className="title">Register </p>
          {/* <p className="message">Signup now and get full access to our app. </p> */}
          <div className="input-container">
            <input
              type="text"
              placeholder="First Name"
              {...register("firstName")}
            />
            <small className="text-danger">{errors.firstName?.message}</small>
          </div>

          <div className="input-container">
            <input
              type="text"
              placeholder="Last Name"
              {...register("lastName")}
            />
            <small className="text-danger">{errors.lastName?.message}</small>
          </div>

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
          <div className="input-container">
            <input
              type="password"
              placeholder="Confirm password"
              {...register("confirmPassword")}
            />
            <small className="text-danger">
              {errors.confirmPassword?.message}
            </small>
          </div>
          <input className="submit" type="submit" value={"Submit"} />
          <p className="signin">
            Already have an acount ?{" "}
            <Link className="link-to" to={"/login"}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
