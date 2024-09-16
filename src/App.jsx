import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./slices/authSlice";
import authService from "./appwrite/auth";
import Loading from "./components/Loading";
import { Header, Footer } from "./components";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import AddPost from "./components/AddPost";
import AllPosts from "./pages/AllPosts";
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { PageNotFound } from "./pages/PageNotFound";
import { Home } from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        {/*  public routes*/}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<LandingPage />} />
        {/*  private  routes*/}
        <Route element={<ProtectedRoute />}>
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="/addPost" element={<AddPost />} />
        <Route path="/home" element={<Home />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
  // ) : (
  // <Loading />
  // );
}

export default App;
