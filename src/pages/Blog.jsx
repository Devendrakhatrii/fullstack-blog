import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Edit, Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import service from "@/appwrite/database";
import { getPost } from "@/slices/postSlice";
import { useSelector } from "react-redux";

export default function BlogPage({ setCurrentPage, setEditingPost }) {
  const dispatch = useDispatch();

  const [userPosts, setUserPosts] = useState([]);

  const { $id, name } = useSelector((state) => state.auth?.userData);
  console.log($id, name);
  const posts = useSelector((state) => state.post.userPost);
  console.log(posts);

  const handleDelete = (id) => {
    setUserPosts(userPosts.filter((post) => post.id !== id));
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setCurrentPage("editPost");
  };
  useEffect(() => {
    service.getPost($id).then((posts) => dispatch(getPost(posts)));
    setUserPosts(posts.documents);
  }, [dispatch, $id]);
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold">My Blog Posts</h2>
          <p className="text-muted-foreground mt-1">
            You have {userPosts.length} posts
          </p>
        </div>
        <Link to="/add-post">
          <Button onClick={() => setCurrentPage("addPost")}>
            <Plus className="mr-2 h-4 w-4" /> New Post
          </Button>
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {userPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <CardHeader>
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <p className="text-sm text-muted-foreground">{post.$createdAt}</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground line-clamp-3">
                {post.content}
              </p>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Link to={`/edit-post/${userPosts.id}`}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(post)}
                >
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
              </Link>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(post.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
