import service from "@/appwrite/database";
import { cn } from "@/lib/utils";
import { Ellipsis, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { getPost, getPosts } from "@/slices/postSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export function NewPostCard({ post }) {
  console.log(post);

  const [imageUrl, setImageUrl] = useState("");
  const [enableEdit, setEnableEdit] = useState(false);
  const userData = useSelector((state) => state?.auth?.userData);
  const dispatch = useDispatch();
  const handleEdit = async () => {
    try {
      const edit = await service.updatePost(post.$id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const remove = await service.deleteDocument(post.$id);
      if (remove) {
        toast.success("post deleted!");
        service.getPosts().then((posts) => dispatch(getPosts(posts)));
        service.getPost().then((posts) => dispatch(getPost(posts)));
      }
    } catch (error) {
      toast.error("Unable to delete!");
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchImage = async () => {
      let imageid = post.image || null;

      if (imageid) {
        const data = await service.filePreview(imageid);
        console.log(data);
        if (data) {
          console.log(data.href);

          setImageUrl(data.href);
        }
      }
    };
    fetchImage();
    if (userData?.$id === post?.id) setEnableEdit(true);
  }, [post, userData]);

  const defaultImage =
    "https://images.unsplash.com/photo-1544077960-604201fe74bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1";

  return (
    <>
      <div className="max-w-xs w-full group/card  overflow-auto">
        <div
          className={cn(
            " cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl  max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4",
            "bg-cover"
          )}
          // style={{
          //   // backgroundImage: `${imageUrl}`,

          //   backgroundImage: `url(${imageUrl}&auto=format&fit=crop&w=1651&q=80)`,

          //   // backgroundImage: `url(https://images.unsplash.com/photo-1544077960-604201fe74bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80)`,
          // }}
          style={{
            position: "relative",
            backgroundImage: `url(${imageUrl}&auto=format&fit=crop&w=1651&q=80)`,
            backgroundSize: "cover", // Ensures the image covers the entire container
            backgroundPosition: "center", // Centers the image
            backgroundRepeat: "no-repeat", // Prevents the image from repeating
            // aspectRatio: "16 / 9", // Sets the aspect ratio (16:9 in this case)
            // width: "100%", // Adjusts the container width
            // height: "auto", // Height will adjust based on the aspect ratio
            // display: "block", // Ensures the div takes up space
          }}
        >
          <div className="absolute w-full h-full top-0 left-0 transition duration-300 bg-black opacity-50 group-hover/card:opacity-60"></div>
          <div className="flex gap-4 items-center justify-between">
            <div className="flex flex-row items-center space-x-4 z-10 ">
              <img
                height="100"
                width="100"
                alt="Avatar"
                src="https://images.unsplash.com/photo-1726175392409-f05854f24af0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8"
                className="h-10 w-10 rounded-full border-2 object-cover aspect-square"
              />
              <div className="flex flex-col">
                <p className="font-normal text-base text-gray-50 relative z-10">
                  {post.name}
                </p>
                <p className="text-sm text-gray-400">2 min read</p>
              </div>
            </div>
            <div className=" z-10 rounded-[50%]  hover:bg-black hover:opacity-30 flex items-center justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  {enableEdit ? <Ellipsis className="text-white" /> : null}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Post</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link to={`/editPost/${post.$id}`}>
                    <DropdownMenuItem onClick={handleEdit}>
                      <Sheet asChild>
                        <SheetTrigger>Edit</SheetTrigger>
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle>Are you absolutely sure?</SheetTitle>
                            <SheetDescription>
                              This action cannot be undone. This will
                              permanently delete your account and remove your
                              data from our servers.
                            </SheetDescription>
                          </SheetHeader>
                        </SheetContent>
                      </Sheet>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem onClick={handleDelete}>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          {/* <img src={imageUrl} alt="" className="size-30 w-full bg-cover" /> */}
          <div className="text content">
            <h1 className="font-semibold text-md md:text-2xl text-gray-50 relative z-10">
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
