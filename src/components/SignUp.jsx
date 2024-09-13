// import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Input from "./Input";
  import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    Divider,
  } from "@chakra-ui/react";

const SignUp = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const signUp = async (data) => {
    try {
      console.log(data);

      const signedUp = await authService.createAccount(data);
      console.log(signedUp);
      if (signedUp) navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center space-y-20">
      <Card>
        <CardBody>
          <form onSubmit={handleSubmit(signUp)}>
            <Input label="Name:" {...register("name", { required: true })} />
            <Input
              label="Email:"
              type="email"
              {...register("email", { required: true })}
            />
            <Input
              label="Password:"
              type="password"
              {...register("password", { required: true })}
            />
          </form>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing={"2"}>
            <Button type="submit" variant={"solid"} colorScheme="blue">
              Sign Up
            </Button>

            <Link to={"/login"}>
              <Button colorScheme="blue" variant={"ghost"}>
                Login
              </Button>
            </Link>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
