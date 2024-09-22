import { useEffect, useState } from "react";
import service from "@/appwrite/database";

const PostImage = ({ post }) => {
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    const fetchImage = async () => {
      let imageid = post.image || null;

      if (imageid) {
        const data = await service.filePreview(imageid);

        if (data) {
          setImageUrl(data.href);
        }
      }
    };
    fetchImage();
  }, [post.image]);
  return (
    <img
      src={imageUrl}
      alt={post.title}
      className="w-full h-48 object-cover aspect-square"
    />
  );
};

export default PostImage;
