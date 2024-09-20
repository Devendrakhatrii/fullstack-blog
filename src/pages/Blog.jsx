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

export default function BlogPage({ setCurrentPage, setEditingPost }) {
  const [userPosts, setUserPosts] = useState([
    {
      id: 1,
      title: "My First Blog Post",
      content: "This is the content of my first blog post.",
      date: "2023-05-15",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Reflections on Coding",
      content: "Thoughts and experiences from my coding journey.",
      date: "2023-05-20",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]);

  const handleDelete = (id) => {
    setUserPosts(userPosts.filter((post) => post.id !== id));
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setCurrentPage("editPost");
  };

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
                <p className="text-sm text-muted-foreground">{post.date}</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground line-clamp-3">
                {post.content}
              </p>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Link to={`/edit-post/${post.id}`}>
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
