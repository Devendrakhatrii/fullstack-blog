import { cn } from "@/lib/utils";
import GridPattern from "@/components/magicui/grid-pattern";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function PageNotFound() {
  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white">
        404 | Page Not Found
      </p>
      <h1>
        <Link to={"/home"}>
          <Button
            variant="link"
            className="text-black mt-10 underline hover:text-gray-700"
          >
            Home
          </Button>
        </Link>
      </h1>
      <GridPattern
        squares={[
          [4, 4],
          [5, 1],
          [8, 2],
          [5, 3],
          [5, 5],
          [10, 10],
          [12, 15],
          [15, 10],
          [10, 15],
          [15, 10],
          [10, 15],
          [15, 10],
        ]}
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />
    </div>
  );
}
