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
import { setPosts } from "@/slices/postSlice";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import PostImage from "@/components/PostImage";
import { postLoading } from "@/slices/postSlice";
import Loading from "@/components/Loading";

export default function AddEditPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [imageId, setImageId] = useState(null);
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
      let newImageId = post.image; // Default to the existing image

      // Only delete and upload a new image if a new file is provided
      if (data.image && data.image[0]) {
        // Delete the old image if it exists
        if (post.image) {
          const deleted = await service.deleteFile(post.image);
          console.log("deleted", deleted);
        }

        // Upload the new image
        const file = data.image[0];
        const image = await service.uploadFile(file);
        console.log("image", image);
        newImageId = image.$id;
      }

      // Always update with the newImageId (which could be the old image id if no new image was uploaded)
      const updateData = { ...data, image: newImageId };
      console.log("updateData", updateData);

      const update = await service.updatePost(post.$id, updateData);

      if (update) {
        toast.success("Updated!");
        service.getPosts((posts) => {
          dispatch(postLoading(true));
          dispatch(setPosts(posts));
          dispatch(postLoading(false));
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
        <h2 className="md:text-3xl text-xl font-bold">
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
