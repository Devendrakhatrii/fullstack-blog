import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
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
import { useEffect, useState } from "react";
import { getPost, getPosts } from "@/slices/postSlice";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const [slug, setSlug] = useState("");
  const { register, handleSubmit, setValue, reset, watch } = useForm({
    defaultValues: {
      status: "true", // "true" will select the "Active" option by default
    },
  });
  const selectedStatus = watch("status");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { $id, name } = useSelector((state) => state.auth?.userData);
  console.log($id, name);
  const posts = useSelector((state) => state.post.userPost);
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
        setSlug("");
        service.getPosts().then((posts) => dispatch(getPosts(posts)));
        service.getPost().then((posts) => dispatch(getPost(posts)));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = (data) => {
    console.log(data);

    toast.promise(addPost(data), {
      loading: "Creating post...",
      success: "Post created successfully!",
      error: "Error creating post.",
    });
  };

  const createSlug = (e) => {
    let value = e.target.value.split(" ").join("-");
    setSlug(value);
  };

  useEffect(() => {
    service.getPost($id).then((posts) => dispatch(getPost(posts)));
  }, [dispatch, $id]);
  return (
    <div className=" w-screen h-screen flex items-center justify-center">
      {" "}
      <div className=" p-3  w-[50vw] h-[70vh]">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center justify-center text-center p-5 space-x-5 gap-7 flex-col ">
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
                {...register("title", {
                  required: true,
                  onChange: (e) => createSlug(e),
                })}
              />
            </div>
            <div className="flex items-center gap-2 w-full">
              <Label htmlFor="link" className="">
                Slug
              </Label>
              <Input
                label="Slug: "
                type="text"
                value={slug}
                disabled
                {...register("slug")}
              />
            </div>
            <div className="flex items-center gap-2 w-full">
              <Label htmlFor="link" className="">
                Content
              </Label>
              <Textarea
                placeholder="your content here!"
                label="Content:"
                className="size-full"
                {...register("content", { required: true })}
              />
            </div>

            <div className="flex items-center gap-5 w-full ">
              <Label>Status</Label>{" "}
              <Select
                defaultValue={selectedStatus}
                onValueChange={(value) => setValue("status", value === "true")}
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

          <div className=" flex items-center justify-between  w-full p-2 px-10 mt-10">
            <Button onClick={() => navigate(-1)}>Back</Button>

            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
