import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authService } from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { login as storeLogin } from "../slices/authSlice";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";
import Input from "./index";

const Login = () => {
  const { register, handleSubmit } = useForm();
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
  return (
    <>
      <Card maxW="sm">
        <CardBody>
          <form action="" onSubmit={handleSubmit(login())}>
            <Input {...register("email"),{required:true, validate:{
              matchPattern:(v)=>/^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/igm.test(v) || "Email must be valid."
            }}} type="email" label="Email:"/>
            <Input label="Password: " type="password" {...register("password",{required:true})}/>
          </form>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue"
            type="submit">
              Login
            </Button>
            <Button variant="ghost" colorScheme="blue">
              Sign Up
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </>
  );
};

export default Login;
