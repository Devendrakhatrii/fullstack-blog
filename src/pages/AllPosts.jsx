import { useEffect, useState } from "react";
import service from "../appwrite/database";
import PostCard from "../components/PostCard";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const allPosts = async () => {
      try {
        const data = await service.getPosts();
        console.log(data);

        if (data) {
          setPosts(data.documents);
        }
      } catch (error) {
        console.log(error);
      }
    };
    allPosts();
  }, []);
  return (
    <>
      <div className="w-screen h-screen flex flex-1 gap-5 items-center justify-center">
        <h1>
          <a href="https://wa.me/9762961214">
            <button>whatsapp</button>
          </a>
        </h1>
        {posts.map((post) => {
          return (
            <div key={post.$id}>
              <PostCard {...post} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AllPosts;
