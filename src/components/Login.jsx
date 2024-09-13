import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { login as storeLogin } from "../slices/authSlice";

import { Card, CardBody, CardFooter } from "@chakra-ui/react";

import { Divider, Button, ButtonGroup } from "@chakra-ui/react";
import { Input } from "./index";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginForm = async (data) => {
    console.log("met");

    try {
      setError("");
      const session = await authService.login(data);
      console.log(session);

      if (session) {
        const userData = await authService.checkCurrentUser();
        console.log(userData);

        if (userData) dispatch(storeLogin());
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <div className=" w-full h-screen flex items-center justify-center">
        <Card maxW="sm" className="">
          <form action="" onSubmit={handleSubmit(loginForm)}>
            <CardBody>
              <Input
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (v) =>
                      /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/gim.test(v) ||
                      "Email must be valid.",
                  },
                })}
                type="email"
                label="Email:"
              />
              <Input
                label="Password: "
                type="password"
                {...register("password", { required: true })}
              />
            </CardBody>
            <Divider />
            <CardFooter>
              <ButtonGroup spacing="2">
                <Button variant="solid" colorScheme="blue" type="submit">
                  Login
                </Button>
                <Link to={"/signup"}>
                  <Button variant="ghost" colorScheme="blue">
                    Sign Up
                  </Button>
                </Link>
              </ButtonGroup>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
};

export default Login;
