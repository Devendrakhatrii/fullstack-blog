import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Textarea,
} from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
// import { Input } from "./index";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import service from "../appwrite/database";
import authService from "../appwrite/auth";

const AddPost = () => {
  const { register, handleSubmit } = useForm();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await authService.checkCurrentUser();
        console.log(userData.$id);
        setUserId(userData.$id);
      } catch (error) {
        console.log(error);
      }
    };
    checkUser();
  }, []);

  const addPost = async (data) => {
    try {
      const file = data.image[0];
      const image = await service.uploadFile(file);
      if (image) {
        const post = await service.createPost({
          ...data,
          id: userId,
          image: image.$id,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center">
        <form onSubmit={handleSubmit(addPost)}>
          <Card>
            <CardHeader>Create Post</CardHeader>
            <CardBody>
              <Input
                label="Image: "
                type="file"
                {...register("image", { required: true })}
              />
              <Input
                label="Title: "
                type="text"
                {...register("title", { required: true })}
              />
              <Input
                label="Slug: "
                type="text"
                {...register("slug", { required: true })}
              />
              <Textarea
                placeholder="your content here!"
                label="Content:"
                {...register("content", { required: true })}
              />
              <Select
                placeholder=""
                {...register("content", { required: true })}
              >
                <option value="option1" default>
                  active
                </option>
                <option value="option2">in active</option>
              </Select>
            </CardBody>
            <Divider />
            <CardFooter>
              <ButtonGroup spacing={"2"}>
                <Button type="submit">Add Post</Button>
                <Button>Cancel</Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        </form>
      </div>
    </>
  );
};

export default AddPost;
