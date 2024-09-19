import { NewPostCard } from "@/components/NewPostCard";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

export const Home = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const posts = useSelector((state) => state.post.allPosts);
  console.log(posts);

  useEffect(() => {
    if (posts) {
      setData(posts.documents);
    }
  }, [dispatch, posts]);

  console.log(data);
  return (
    <>
      <div className=" p-10  w-full min-h-screen flex flex-wrap items-center justify-center  gap-5 ">
        {data &&
          data?.map((post, index) => {
            return <NewPostCard post={post} key={index} />;
          })}
      </div>
    </>
  );
};
