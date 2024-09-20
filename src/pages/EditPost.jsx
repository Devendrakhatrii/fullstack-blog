import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import service from "@/appwrite/database";
import { getPost, getPosts } from "@/slices/postSlice";
import toast from "react-hot-toast";

export default function AddEditPostPage({
  setCurrentPage,
  editingPost = null,
}) {
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
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Button>
        <h2 className="text-3xl font-bold">
          {editingPost ? "Edit Post" : "Add New Post"}
        </h2>
      </div>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input
                label="Title: "
                type="text"
                {...register("title", {
                  required: true,
                  onChange: (e) => createSlug(e),
                })}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="slug" className="text-sm font-medium">
                Slug
              </label>
              <Input
                label="Slug: "
                type="text"
                value={slug}
                disabled
                {...register("slug")}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">
                Content
              </label>
              <Textarea
                id="content"
                placeholder="your content here!"
                label="Content:"
                className="size-full"
                {...register("content", { required: true })}
                rows={10}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="image" className="text-sm font-medium">
                Image
              </label>
              <Input label="Image: " type="file" {...register("image")} />
            </div>
            {/* {post.image && (
              <img
                src={post.image}
                alt="Post preview"
                className="w-full h-48 object-cover rounded-md"
              />
            )} */}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              {editingPost ? "Update Post" : "Create Post"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
