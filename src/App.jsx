import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./slices/authSlice";
import authService from "./appwrite/auth";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { PageNotFound } from "./pages/PageNotFound";

import service from "./appwrite/database";
import { getPosts } from "./slices/postSlice";
import EditPost from "./pages/EditPost";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Edit, Trash2, Plus } from "lucide-react";
import AddEditPostPage from "./pages/EditPost";
import HomePage from "./pages/Home";
import BlogPage from "./pages/Blog";
import ProfilePage from "./pages/Profile";

const blogPosts = [
  {
    id: 1,
    author: "Conan Mccullough",
    avatar: "/placeholder-user.jpg",
    readTime: "2 min read",
    title: "My 7 Income Sources With One AI Tool",
    content:
      "A few years back I was looking for a business I can do from home. After extensive research and experimentation, I discovered an AI tool that opened up multiple income streams. In this post, I'll share my journey and how you can leverage AI for your own financial growth.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    author: "Conan Mccullough",
    avatar: "/placeholder-user.jpg",
    readTime: "2 min read",
    title:
      "Flutter Vs React Native : Performance Benchmarks you can't miss! 🔥⚡ [Part -1]",
    content:
      "When it comes to mobile app development, the choice between Flutter and React Native often hinges on performance considerations. In this first part of our series, we'll dive deep into various performance metrics, comparing these two popular frameworks side by side.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    author: "Cynthia Barrera",
    avatar: "/placeholder-user.jpg",
    readTime: "2 min read",
    title: "The Future of Web Development: Trends to Watch",
    content:
      "As technology evolves at a rapid pace, web development is constantly changing. In this post, we explore emerging trends that are shaping the future of web development, from AI-driven design to the rise of WebAssembly.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 4,
    author: "Cynthia Barrera",
    avatar: "/placeholder-user.jpg",
    readTime: "2 min read",
    title: "Mastering CSS Grid: A Comprehensive Guide",
    content:
      "CSS Grid has revolutionized web layout design. This comprehensive guide will take you from the basics to advanced techniques, helping you create complex, responsive layouts with ease.",
    image: "/placeholder.svg?height=400&width=600",
  },
];
function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [currentPage, setCurrentPage] = useState("home");
  const [editingPost, setEditingPost] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
          <Route
            path="/add-post"
            element={<AddEditPostPage setCurrentPage={setCurrentPage} />}
          />
          <Route
            path="/edit-post/:id"
            element={
              <AddEditPostPage
                setCurrentPage={setCurrentPage}
                editingPost={editingPost}
              />
            }
          />
          <Route
            path="/home"
            element={
              <HomePage
                blogPosts={blogPosts}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            }
          />
          <Route
            path="/blog"
            element={
              <BlogPage
                setCurrentPage={setCurrentPage}
                setEditingPost={setEditingPost}
              />
            }
          />
          <Route path="/profile" element={<ProfilePage />} />
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
