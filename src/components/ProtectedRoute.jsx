import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import Loading from "./Loading";
const ProtectedRoute = ({ children }) => {
  const { authStatus, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <Loading />; // Or a proper loading component
  }

  return authStatus ? (
    <>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default ProtectedRoute;
