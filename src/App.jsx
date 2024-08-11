import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./slices/authSlice";
import authService from "./appwrite/auth";
import Loading from "./components/Loading";
import { Header, Footer } from "./components";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .checkCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return !loading ? (
    <>
      <Header />
      <main>Hello</main>
      <Footer />
    </>
  ) : (
    <Loading />
  );
}

export default App;
