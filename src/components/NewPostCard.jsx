import service from "@/appwrite/database";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function NewPostCard({ post }) {
  const [imageUrl, setImageUrl] = useState("");
  let imageid = post.image || null;
  if (imageid) {
    service.filePreview(imageid).then((data) => {
      console.log(data);

      if (data) {
        setImageUrl(data.href);
      }
    });
  }
  const defaultImage =
    "https://images.unsplash.com/photo-1544077960-604201fe74bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1";

  return (
    <>
      <div className="max-w-xs w-full group/card ">
        <div
          className={cn(
            " cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl  max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4",
            `bg-[url(${
              imageUrl || defaultImage
              // "https://images.unsplash.com/photo-1544077960-604201fe74bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1"
            }&auto=format&fit=crop&w=1651&q=80)] bg-cover`
          )}
        >
          <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
          <div className="flex flex-row items-center space-x-4 z-10">
            <img
              height="100"
              width="100"
              alt="Avatar"
              src="https://images.unsplash.com/photo-1726175392409-f05854f24af0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8"
              className="h-10 w-10 rounded-full border-2 object-cover"
            />
            <div className="flex flex-col">
              <p className="font-normal text-base text-gray-50 relative z-10">
                {post.name}
              </p>
              <p className="text-sm text-gray-400">2 min read</p>
            </div>
          </div>
          <div className="text content">
            <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10">
              {post.title}
            </h1>
            <p className="font-normal text-sm text-gray-50 relative z-10 my-4">
              {/* {post.content.split(" ").slice(0, 100).join(" ").concat("...")} */}
              {post.content}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
