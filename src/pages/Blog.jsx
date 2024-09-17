import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import service from "@/appwrite/database";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { getPost, getPosts } from "@/slices/postSlice";

const Blog = () => {
  const { register, handleSubmit, setValue, reset, watch } = useForm({
    defaultValues: {
      status: "true", // "true" will select the "Active" option by default
    },
  });
  const selectedStatus = watch("status");
  const dispatch = useDispatch();
  const { $id, name } = useSelector((state) => state.auth?.userData);
  console.log($id, name);
  const posts = useSelector((state) => state.post.post);
  console.log(posts);

  const addPost = async (data) => {
    console.log(data);

    try {
      let imageId = null;
      if (data.image && data.image[0]) {
        const file = data?.image[0];
        const image = await service.uploadFile(file);
        imageId = image.$id || null;
      }

      const postData = { ...data, id: $id, name: name, image: imageId };
      console.log(postData);

      const post = await service.createPost(postData);
      console.log(post);

      if (post) {
        reset();
        service.getPosts().then((posts) => dispatch(getPosts(posts)));
        service.getPost().then((posts) => dispatch(getPost(posts)));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = (data) => {
    toast.promise(addPost(data), {
      loading: "Creating post...",
      success: "Post created successfully!",
      error: "Error creating post.",
    });
  };
  useEffect(() => {
    service.getPost(name).then((posts) => dispatch(getPost(posts)));
  }, [dispatch, $id]);

  return (
    <>
      <Dialog className={" w-screen"}>
        <DialogTrigger asChild>
          <Button>Add</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle className={"text-center"}>Add your Blog</DialogTitle>
              <DialogDescription className={"text-center"}>
                Add detail about your blog.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center justify-center text-center p-5 space-x-5 gap-5 flex-col ">
              <div className="flex items-center gap-2 w-full">
                <Label htmlFor="link" className="">
                  Image
                </Label>
                <Input label="Image: " type="file" {...register("image")} />
              </div>
              <div className="flex items-center gap-2 w-full">
                <Label htmlFor="link" className="">
                  Title
                </Label>
                <Input
                  label="Title: "
                  type="text"
                  {...register("title", { required: true })}
                />
              </div>
              <div className="flex items-center gap-2 w-full">
                <Label htmlFor="link" className="">
                  Slug
                </Label>
                <Input
                  label="Slug: "
                  type="text"
                  {...register("slug", { required: true })}
                />
              </div>
              <div className="flex items-center gap-2 w-full">
                <Label htmlFor="link" className="">
                  Content
                </Label>
                <Textarea
                  placeholder="your content here!"
                  label="Content:"
                  {...register("content", { required: true })}
                />
              </div>

              <div className="flex items-center gap-5 w-full ">
                <Label>Status</Label>{" "}
                <Select
                  defaultValue={selectedStatus}
                  onValueChange={(value) =>
                    setValue("status", value === "true")
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Active</SelectItem>
                    <SelectItem value="false">inActive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="sm:justify-start">
              <div className=" flex items-center justify-between  w-full p-2">
                <DialogClose asChild>
                  <Button type="button" variant="">
                    Close
                  </Button>
                </DialogClose>
                <Button type="submit" variant="">
                  Submit
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Blog;
