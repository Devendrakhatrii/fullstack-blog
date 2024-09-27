import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Edit, Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatTimeAgo } from "@/lib/utils";
import PostImage from "@/components/PostImage";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import service from "@/appwrite/database";
import { toast } from "react-hot-toast";

export default function BlogPage() {
  const { allPosts, isLoading, error } = useSelector((state) => state.post);
  const { userData } = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (userData && allPosts?.documents) {
      const filteredPosts = allPosts.documents.filter(
        (post) => post.id === userData.$id
      );
      setPosts(filteredPosts);
    }
  }, [userData, allPosts, isLoading]);

  const handleDelete = async (id) => {
    try {
      const response = await service.deleteDocument(id);
      if (response) {
        toast.success("Post deleted successfully");
        setPosts((prev) => prev.filter((post) => post.$id !== id));
      }
    } catch (error) {
      toast.error("Error deleting post");
    }
  };

  if (isLoading || !allPosts?.documents) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="text-center w-full h-full text-4xl">Error: {error}</div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold">My Blog Posts</h2>
          <p className="text-muted-foreground mt-1">
            You have {posts?.length} posts
          </p>
        </div>
        <Link to="/add-post">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Post
          </Button>
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post, index) => (
          <Card
            key={`post-${post.id}-${index}`}
            className="overflow-hidden shadow-2xl"
          >
            <PostImage post={post} />

            <CardHeader>
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">{post.title}</h3>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground line-clamp-3">
                {post.content}
              </p>
            </CardContent>
            <CardFooter className="flex gap-5 flex-col justify-between space-x-2">
              <div className="flex w-full md:gap-5 gap-3 justify-evenly md:justify-between md:px-10">
                <p className="text-sm text-muted-foreground ">
                  Created: {new Date(post.$createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-muted-foreground ">
                  Updated: {formatTimeAgo(post.$updatedAt)}
                </p>
              </div>
              <div className="w-full flex md:gap-5 px-5 items-center justify-between">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button variant="outline" size="sm">
                    <Edit className="md:mr-2 h-4 w-4" /> Edit
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(post.$id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
