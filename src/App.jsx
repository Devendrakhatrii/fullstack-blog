import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, authLoading } from "./slices/authSlice";
import authService from "./appwrite/auth";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { PageNotFound } from "./pages/PageNotFound";
import service from "./appwrite/database";
import AddEditPostPage from "./pages/EditPost";
import HomePage from "./pages/Home";
import BlogPage from "./pages/Blog";
import ProfilePage from "./pages/Profile";
import { useState } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store/store"; // Update this import
import Loading from "./components/Loading";
import BlogDetail from "./pages/BlogDetail";
import { setPosts, postLoading } from "@/slices/postSlice";

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const dispatch = useDispatch();
  const { isLoadingAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchPosts = async () => {
      dispatch(postLoading(true));
      const posts = await service.getPosts();
      dispatch(setPosts(posts));
      dispatch(postLoading(false));
    };
    const checkUserSession = async () => {
      try {
        dispatch(authLoading(true));
        const user = await authService.checkCurrentUser();
        console.log("Current user:", user);
        if (user) {
          dispatch(login(user));
          dispatch(authLoading(false));
          fetchPosts();
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Error checking user session:", error);
        dispatch(logout());
        dispatch(authLoading(false));
      } finally {
        dispatch(postLoading(false));
        dispatch(authLoading(false));
      }
    };

    checkUserSession();
  }, [dispatch]);

  if (isLoadingAuth) {
    const fetchPosts = async () => {
      const posts = await service.getPosts();
      dispatch(setPosts(posts));
    };
    fetchPosts();
    return <Loading />; // Or a proper loading component
  }

  return (
    <PersistGate loading={null} persistor={persistor}>
      <Routes>
        {/*  public routes*/}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<LandingPage />} />
        {/*  private  routes*/}
        <Route element={<ProtectedRoute />}>
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="/add-post" element={<AddEditPostPage />} />
          <Route path="/blog-detail/:id" element={<BlogDetail />} />
          <Route path="/edit-post/:id" element={<AddEditPostPage />} />
          <Route
            path="/home"
            element={
              <HomePage activeTab={activeTab} setActiveTab={setActiveTab} />
            }
          />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </PersistGate>
  );
}

export default App;
