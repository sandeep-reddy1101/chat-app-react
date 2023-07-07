import React, { useEffect } from "react";
import "./addcontact.css";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../services/post";
import { getUserInfoFromLocal } from "../../services/localStorage";
import { pushContactToList } from "../../store";

function AddContact() {
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.user.value);
    const navigate = useNavigate();

  const schema = yup.object().shape({
    phoneNo: yup
      .string()
      .matches("^[0-9]{10}$", "Phone number is not valid")
      .required("phone no is required"),
    nickName: yup.string().required("Name is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const formSubmit = (data) => {
    addContact(userInfo.userId, data.nickName, data.phoneNo).then((backendResponse) => {
        if(backendResponse.flag){
            dispatch(pushContactToList(backendResponse.data[0]))
            navigate('/');
        }else{
            console.log("some error occured in backend >>> ", backendResponse.message)
        }
    })
  }

  const checkUserLogin = () => {
    const local = JSON.parse(getUserInfoFromLocal());
    if(!(local && local.login)){
      navigate('/login')
    }
  }

  useEffect(() => {
    checkUserLogin()
  }, [])

  return (
    <div>
      <div className="login-form">
        <form className="form" onSubmit={handleSubmit(formSubmit)}>
          <p className="form-title">Add new contact</p>
          <div className="input-container">
            <input
              type="text"
              placeholder="Name of the contact"
              {...register("nickName")}
            />
            <small className="text-danger">{errors.name?.message}</small>
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="Enter phone number"
              {...register("phoneNo")}
            />
            <small className="text-danger">{errors.friendPhoneNo?.message}</small>
          </div>
          <input type="submit" className="submit mt-2" value={"Add to contact"} />

          <p className="signup-link mt-1">
            <Link to={"/"}>Home</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default AddContact;
