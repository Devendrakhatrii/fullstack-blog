import React from "react";
import ShimmerButton from "@/components/magicui/shimmer-button";
import RetroGrid from "@/components/magicui/retro-grid";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <RetroGrid />
      <div className="w-screen h-screen">
        <div className="w-full h-30 flex item-center justify-end gap-10 p-10 pt-5">
          {/* <Button asChild className="p-6 px-8 rounded-full">
          <Link href="/login">Login</Link>
        </Button> */}
          <div className="z-10    mt-0 pt-0">
            <Link to={"/login"}>
              <ShimmerButton className="shadow-2xl">
                <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                  Login
                </span>
              </ShimmerButton>
            </Link>
          </div>
          <div className="z-10   mt-0 pt-0">
            <Link to={"/signup"}>
              <ShimmerButton className="shadow-2xl">
                <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                  Sign Up
                </span>
              </ShimmerButton>
            </Link>
          </div>
        </div>

        <div className="px-32 mt-20">
          <h1 className="text-7xl font-bold">
            <span className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-[#ecc412] via-[#09010b] to-[#330461] bg-clip-text text-center text-7xl font-bold leading-none tracking-tighter text-transparent">
              Blogging App
            </span>
          </h1>

          <h5 className="font-light text-4xl mt-10">
            Built with React, Appwrite, and shadcn UI, this project is a sleek,
            <br />
            responsive platform designed for bloggers to share their stories
            effortlessly. <br />
            It blends modern design with powerful backend services to offer a
            smooth writing experience.
          </h5>

          <div className="z-10 flex min-h-[16rem] items-center mt-0 pt-0">
            <Link to={"/login"}>
              <ShimmerButton className="shadow-2xl">
                <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                  Get started
                </span>
              </ShimmerButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
