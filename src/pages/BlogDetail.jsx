import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ArrowLeft, Heart, MessageCircle, Share2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PostImage from "@/components/PostImage";
import Loading from "@/components/Loading";
import service from "@/appwrite/database";
import { useDispatch } from "react-redux";
import { setPosts } from "@/slices/postSlice";

export default function BlogDetail({ setCurrentPage, postId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { allPosts, loading } = useSelector((state) => state.post);
  console.log(allPosts);

  const post = allPosts?.documents?.find((post) => post.$id === id);
  console.log(post);

  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    // setIsLiked(!isLiked);
    // setPost((prevPost) => ({
    //   ...prevPost,
    //   likes: isLiked ? prevPost.likes - 1 : prevPost.likes + 1,
    // }));
  };

  if (loading || !allPosts?.documents || !post) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto h-min px-4 py-8 space-y-8">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Blog
      </Button>
      <Card className="overflow-hidden ">
        <PostImage post={post} />
        <CardHeader>
          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={post} alt={post.author} />
              <AvatarFallback>
                {post?.name.split(" ")[0][0] + post?.name.split(" ")[1][0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{post.name}</p>
              <p className="text-sm text-muted-foreground">
                {post.$createdAt.split("T")[0]}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            {post?.content?.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="flex space-x-4">
            <Button variant="ghost" onClick={handleLike}>
              <Heart
                className={`mr-2 h-4 w-4 ${
                  isLiked ? "fill-current text-red-500" : ""
                }`}
              />
              {post.likes}
            </Button>
            <Button variant="ghost">
              <MessageCircle className="mr-2 h-4 w-4" />
              {post.comments}
            </Button>
          </div>
          <Button variant="ghost">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
