import React from "react";
import service from "../appwrite/database";

const PostCard = ({ $id, title, featuredImage }) => {
  return (
    <div className="w-full">
      <div className="w-full justify-center mb-4">
        <img src={service.filePreview(featuredImage)} alt={title} />
      </div>
      <h2>{title}</h2>
    </div>
  );
};

export default PostCard;
