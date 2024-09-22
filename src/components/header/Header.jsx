import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "@/appwrite/auth";
import toast from "react-hot-toast";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  return (
    <>
      <header className="flex items-center justify-between p-4 bg-white border-b shadow-sm z-50 sticky top-0">
        <h1 className="text-2xl font-bold text-primary">Blogging App</h1>
        <nav className="flex items-center space-x-4">
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
      </header>
    </>
  );
};

export default Header;
