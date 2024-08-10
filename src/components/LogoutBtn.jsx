import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import authService from "../appwrite/auth";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const logoutHaldler = () => {
    authService.logout().then(() => dispatch(logout()));
  };
  return (
    <button type="button" onClick={logoutHaldler}>
      Logout
    </button>
  );
};

export default LogoutBtn;
