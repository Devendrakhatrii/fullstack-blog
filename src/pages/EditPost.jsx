import service from "@/appwrite/database";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
import toast from "react-hot-toast";

const EditPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [slug, setSlug] = useState("");
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  console.log("ID:", id);

  const updatePost = async (data) => {
    console.log(data);
    try {
      let imageId = null;
      if (data.image && data.image[0]) {
        const file = data?.image[0];
        const image = await service.uploadFile(file);
        imageId = image.$id || null;
      }

      const updateData = { ...data, image: imageId };
      console.log(updateData);

      const update = service.updatePost(updateData);
      if (update) toast.success("Updated!");
    } catch (error) {
      console.log(error);
      toast.error("Couldn't update!");
    }
  };

  const createSlug = (e) => {
    let value = e.target.value.split(" ").join("-");
    setSlug(value);
  };

  useEffect(() => {
    const getData = async () => {
      const post = await service.post(id);
      console.log(post);
      setPost(post);
      const image = await service.filePreview(post.image);
      setImageUrl(image.href);
    };
    getData();
  }, [id]);
  return (
    <>
      <div className=" w-screen h-screen flex items-center justify-center  ">
        {" "}
        <div className=" p-3  w-[50vw] h-[70vh] -mt-40">
          <form action="" onSubmit={handleSubmit(updatePost)}>
            <div className="flex items-center justify-center text-center p-5 space-x-5 gap-7 flex-col ">
              <img src={imageUrl} className="size-40 aspect-square" alt="" />
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
                  defaultValue={post.title}
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
                  defaultValue={post.slug}
                  {...register("slug", { required: true })}
                />
              </div>
              <div className="flex items-center gap-2 w-full">
                <Label htmlFor="link" className="">
                  Content
                </Label>
                <Textarea
                  //   placeholder="your content here!"
                  label="Content:"
                  className="size-full"
                  defaultValue={post.content}
                  {...register("content", { required: true })}
                />
              </div>

              <div className="flex items-center gap-5 w-full ">
                <Label>Status</Label>{" "}
                <Select
                  defaultValue={post.status ? "true" : "false"}
                  onValueChange={(value) => setValue("status", value)}
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

              <Button type="submit">Save</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditPost;
