import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import authService from "@/appwrite/auth";

import toast from "react-hot-toast";
import { Menu, Sun, Moon } from "lucide-react";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.authStatus);
  console.log(user);
  const handleLogout = async () => {
    const logout = await authService.logout();
    console.log(logout);

    toast.promise(logout, {
      loading: "Logging out...",
      success: <b>Logged out succesfully!</b>,
      error: <b>Could not logout!</b>,
    });
    if (logout) {
      () => dispatch(logout()),
        setTimeout(() => {
          navigate("/");
        }, 2000);
    }
  };
  return user ? (
    <>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <header className="flex items-center justify-between p-4 bg-white border-b shadow-sm">
          <h1 className="text-2xl font-bold text-primary">Blogging App</h1>
          <nav className="flex items-center space-x-4">
            <Link to="/home">
              <Button variant="ghost" onClick={() => setCurrentPage("home")}>
                Home
              </Button>
            </Link>
            <Link to="/blog">
              <Button variant="ghost" onClick={() => setCurrentPage("blog")}>
                Blog
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" onClick={() => setCurrentPage("profile")}>
                Profile
              </Button>
            </Link>
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </nav>
        </header>
        <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
        <footer className="py-6 px-4 bg-gray-100 text-center">
          <p className="text-sm text-gray-600">
            © 2023 Blogging App. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default ProtectedRoute;
