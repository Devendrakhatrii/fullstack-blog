import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { login } from "@/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useEffect } from "react";

export function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const isLoggedIn = useSelector((state) => state.auth.authStatus);
  const loginForm = async (data) => {
    try {
      const sessionPromise = authService.login(data);

      toast.promise(
        sessionPromise.then((session) => {
          return session?.message || "Logged in successfully!";
        }),
        {
          loading: "Logging in...",
          success: (msg) => <b>{msg}</b>,
          error: (err) => <b>{err?.message || "Could not log in!"}</b>,
        }
      );

      const session = await sessionPromise;

      if (session) {
        const userData = await authService.checkCurrentUser();

        if (userData) dispatch(login(userData));

        navigate("/home");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    isLoggedIn ? navigate("/home") : null;
  }, [isLoggedIn, navigate]);
  return (
    <div className="flex items-center justify-center py-12 mt-20">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <form onSubmit={handleSubmit(loginForm)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (v) =>
                      /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/gim.test(v) ||
                      "Email must be valid.",
                  },
                })}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                {...register("password", { required: true })}
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
