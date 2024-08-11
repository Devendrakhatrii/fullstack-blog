import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authService } from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { login as storeLogin } from "../slices/authSlice";

const Login = () => {
  const { Register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async (data) => {
    try {
      setError("");
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.checkCurrentUser();
        if (userData) dispatch(storeLogin());
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return <div></div>;
};

export default Login;
