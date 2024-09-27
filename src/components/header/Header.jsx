import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "@/appwrite/auth";
import toast from "react-hot-toast";
import { logout } from "@/slices/authSlice";
import { LogOut, MenuIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await authService?.logout();
      console.log(response);
      if (response) {
        navigate("/");
        dispatch(logout());
        toast.success("Logged out succesfully!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Could not logout!");
    }
  };
  return (
    <>
      <header className="flex items-center justify-between  p-4 bg-white border-b shadow-sm z-50 sticky top-0">
        <h1 className="text-xl md:text-2xl font-bold text-primary ">
          Blogging App
        </h1>
        <nav className="md:flex items-center md:space-x-4 hidden ">
          <Link to="/home">
            <Button variant="ghost">Home</Button>
          </Link>
          <Link to="/blog">
            <Button variant="ghost">Blog</Button>
          </Link>
          <Link to="/profile">
            <Button variant="ghost">Profile</Button>
          </Link>
          <Button variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </nav>
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger>
              {/* <Button variant="ghost"> */}
              <MenuIcon className="hover:bg-slate-100 size-6" />
              {/* </Button> */}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link to="/home">
                <DropdownMenuItem>Home</DropdownMenuItem>
              </Link>
              <Link to="/blog">
                <DropdownMenuItem>Blog</DropdownMenuItem>
              </Link>
              <Link to="/profile">
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>
              <Link to="/blog">
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  );
};

export default Header;
