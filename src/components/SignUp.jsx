import React, { useState } from "react";
import authService from "../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Input from "./Input";
import { Button } from "@chakra-ui/react";

const SignUp = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const signUp = async (data) => {
    try {
      setError("");
      const signedUp = await authService.createAccount(data);
      if (signedUp) navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(signUp)}>
        <Input
          label="Name"
          {...register("name", { required: true })}
        />
        <Input
          label="email"
          type="email"
          {...register("email", { required: true })}
        />
        <Input
          label="Password:"
          type="password"
          {...register("password", { required: true })}
        />
        <Button type="submit">Sign Up</Button>

        <Button>Login</Button>
      </form>
    </div>
  );
};

export default SignUp;
