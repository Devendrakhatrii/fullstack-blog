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
import { setPosts, setUserPosts } from "@/slices/postSlice";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import PostImage from "@/components/PostImage";
import { setLoading } from "@/slices/postSlice";
import Loading from "@/components/Loading";

export default function AddEditPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [updateImage, setUpdateImage] = useState(false);
  console.log(id);
  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      status: "true", // "true" will select the "Active" option by default
    },
  });

  if (post) {
    setValue("title", post.title);
    setValue("slug", post.slug);
    setValue("content", post.content);
    setValue("image", post.image);
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { $id, name } = useSelector((state) => state.auth?.userData);
  console.log($id, name);
  const data = useSelector((state) => state.post?.allPosts?.documents);

  console.log(data);

  useEffect(() => {
    if (data) {
      const post = data.find((post) => post.$id === id);
      setPost(post);
      console.log(post);
    } else {
      console.log("data is undefined");
    }
  }, [data, id]);

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
        setValue("slug", "");
        service.getPosts().then((posts) => dispatch(setPosts(posts)));
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
    let value = e.target.value.toLowerCase().split(" ").join("-");
    setValue("slug", value);
  };

  const updatePost = async (data) => {
    console.log(data);
    try {
      let imageId = null;
      if (post.image && data.image) {
        console.log(post.image);
        const deleteImage = await service.deleteFile(post.image);
        console.log(deleteImage);
      }

      if (data.image && data.image[0]) {
        const file = data?.image[0];
        const image = await service.uploadFile(file);
        image ? setUpdateImage(true) : setUpdateImage(false);
      }

      const updateData = updateImage
        ? { ...data, image: imageId }
        : { ...data };
      console.log(updateData);

      const update = service.updatePost(post.$id, updateData);

      if (update) {
        toast.success("Updated!");
        service.getPosts((post) => {
          dispatch(setLoading(true));
          dispatch(setPosts(post));
          dispatch(setLoading(false));
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Couldn't update!");
    }
  };

  // if (loading || !allPosts || !data) return <Loading />;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Button>
        <h2 className="text-3xl font-bold">
          {id ? "Edit Post" : "Add New Post"}
        </h2>
      </div>
      <Card className="pt-4">
        <form
          onSubmit={post ? handleSubmit(updatePost) : handleSubmit(onSubmit)}
        >
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
            {post?.image && (
              <div className="space-y-2">
                <PostImage post={post} />
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="image" className="text-sm font-medium">
                Image
              </label>
              <Input label="Image: " type="file" {...register("image")} />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              {id ? "Update Post" : "Create Post"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
