import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./slices/authSlice";
import authService from "./appwrite/auth";
import Loading from "./components/Loading";
import { Header, Footer } from "./components";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AddPost from "./components/AddPost";
import AllPosts from "./pages/AllPosts";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Routes>
        <Route path="/" element={<AllPosts />} />
        <Route path="/profile" element={<profile />} />
        <Route path="/addPost" element={<AddPost />} />
      </Routes>
    </>
  );
  // ) : (
  // <Loading />
  // );
}

export default App;
