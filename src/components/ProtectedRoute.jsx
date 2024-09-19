import { useSelector } from "react-redux";
import { Navigate, Outlet, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import authService from "@/appwrite/auth";

import toast from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.authStatus);
  console.log(user);
  const handleLogout = async () => {
    const logout = authService.logout();
    console.log(logout);

    toast.promise(logout, {
      loading: "Logging out...",
      success: <b>Logged out succesfully!</b>,
      error: <b>Could not logout!</b>,
    });
    logout.then(
      () => dispatch(logout()),
      setTimeout(() => {
        navigate("/");
      }, 2000)
    );
  };
  return user ? (
    <>
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between  gap-4  bg-slate-50  md:px-6">
        <h1 className=" mx-5">
          <span className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-[#ecc412] via-[#09010b] to-[#330461] bg-clip-text text-center text-2xl font-bold leading-none tracking-tighter text-transparent">
            Blogging App
          </span>
        </h1>
        <nav className="hidden flex-col  gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <div className="flex items-center justify-center gap-20 text-lg  mx-10 ">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  {" "}
                  <Link to={"/home"}>Home</Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to={"/blog"}>Blog</Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to={"/profile"}>profile</Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Button onClick={handleLogout}>Logout</Button>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </nav>
      </header>
      <Outlet />
    </>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default ProtectedRoute;
