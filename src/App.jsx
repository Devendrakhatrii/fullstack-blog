import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./slices/authSlice";
import authService from "./appwrite/auth";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import AddPost from "./components/AddPost";
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { PageNotFound } from "./pages/PageNotFound";
import { Home } from "./pages/Home";
import Blog from "./pages/Blog";
import service from "./appwrite/database";
import { getPosts } from "./slices/postSlice";
import EditPost from "./pages/EditPost";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const user = await authService.checkCurrentUser();
        console.log("Current user:", user);

        if (user) {
          dispatch(login(user));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Error checking user session:", error);
        dispatch(logout());
      }
    };

    const getPost = async () => {
      try {
        const posts = await service.getPosts();
        console.log(posts);

        if (posts) dispatch(getPosts(posts));
      } catch (error) {
        console.log(error);
      }
    };

    checkUserSession();
    getPost();
  }, [dispatch]);
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
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/edit-post/:id" element={<EditPost />} />
          <Route path="/home" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
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
