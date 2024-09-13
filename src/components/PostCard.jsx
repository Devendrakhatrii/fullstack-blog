import React, { useState } from "react";
import service from "../appwrite/database";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const PostCard = ({ title, image, content }) => {
  const [imgUrl, setImageUrl] = useState("");

  service.filePreview(image).then((data) => {
    if (data) {
      setImageUrl(data.href);
    }
  });

  return (
    <>
      <Link to={""}>
        <Card className="text-center bg-red-700 ">
          <CardBody>
            <h1 className="text-2xl">{title}</h1>
            <div className="size-40">
              <img
                src={imgUrl}
                alt={"image"}
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
            <p>{content}</p>
          </CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup gap={"5"}>
              <Button>Like</Button>
              <Button>Edit</Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      </Link>
    </>
  );
};

export default PostCard;
