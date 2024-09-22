import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./slices/authSlice";
import {
  setLoading,
  setPosts,
  setError,
  setUserPosts,
} from "./slices/postSlice";
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
import { store, persistor } from "./store/store"; // Update this import
import Loading from "./components/Loading";
function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();
  const { allPosts, isLoading } = useSelector((state) => state.post);
  const [userCheckComplete, setUserCheckComplete] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkUserSession = async () => {
      setIsCheckingAuth(true);
      try {
        const user = await authService.checkCurrentUser();
        console.log("Current user:", user);
        if (user) {
          setUserId(user.$id);
          dispatch(login(user));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Error checking user session:", error);
        dispatch(logout());
      } finally {
        setIsCheckingAuth(false);
        setUserCheckComplete(true);
      }
    };

    checkUserSession();
  }, [dispatch]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (userCheckComplete && (!allPosts || allPosts.length === 0) && !isLoading) {
        dispatch(setLoading(true));
        try {
          const posts = await service.getPosts();
          dispatch(setPosts(posts));
          console.log(posts);
        } catch (error) {
          console.error("Error fetching posts:", error);
          dispatch(setError(error.message));
        } finally {
          dispatch(setLoading(false));
        }
      }
    };

    fetchPosts();
  }, [dispatch, allPosts, isLoading, userCheckComplete, userId]);

  if (isCheckingAuth) {
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
