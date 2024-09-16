import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.authStatus);
  console.log(user);

  return user ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoute;
