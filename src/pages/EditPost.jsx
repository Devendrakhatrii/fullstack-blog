import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function AddEditPostPage({
  setCurrentPage,
  editingPost = null,
}) {
  const [post, setPost] = useState(
    editingPost || { title: "", content: "", image: "" }
  );
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Submitting post:", post);
    setCurrentPage("blog");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Button>
        <h2 className="text-3xl font-bold">
          {editingPost ? "Edit Post" : "Add New Post"}
        </h2>
      </div>
      <Card>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">
                Content
              </label>
              <Textarea
                id="content"
                value={post.content}
                onChange={(e) => setPost({ ...post, content: e.target.value })}
                required
                rows={10}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="image" className="text-sm font-medium">
                Image URL
              </label>
              <Input
                id="image"
                value={post.image}
                onChange={(e) => setPost({ ...post, image: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            {post.image && (
              <img
                src={post.image}
                alt="Post preview"
                className="w-full h-48 object-cover rounded-md"
              />
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              {editingPost ? "Update Post" : "Create Post"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
