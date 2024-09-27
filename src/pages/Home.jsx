import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import PostImage from "@/components/PostImage";
import { useSelector } from "react-redux";
import Loading from "@/components/Loading";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function HomePage({ activeTab, setActiveTab }) {
  const { allPosts, isLoading, error } = useSelector((state) => state.post);
  const posts = allPosts?.documents || [];
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Tabs
      defaultValue={activeTab}
      className="w-full space-y-8"
      onValueChange={(value) => setActiveTab(value)}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 sticky top-20 bg-white z-50 p-5 px-6 shadow-2xl rounded-full">
        <TabsList className="bg-muted/60 p-1 rounded-lg">
          <TabsTrigger value="home" className="rounded-md">
            Home
          </TabsTrigger>
          <TabsTrigger value="trending" className="rounded-md">
            Trending
          </TabsTrigger>
          <TabsTrigger value="latest" className="rounded-md">
            Latest
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="home" className="space-y-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts?.map((post, index) => (
            <Card
              key={`${post.id}-${index}`}
              className="flex flex-col overflow-hidden "
            >
              <PostImage post={post} />
              <div className="flex flex-col justify-between p-6 flex-grow">
                <div>
                  <CardHeader className="flex flex-row  gap-2 md:gap-4 p-0  md:mb-4 text-center relative">
                    <Avatar>
                      <AvatarImage
                        alt={post.name.split(" ")[0]}
                        src={post.avatar}
                      />
                      <AvatarFallback>
                        {post.name.split(" ")[0][0] +
                          post.name.split(" ")[1][0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <h3 className="font-semibold text-center">{post.name}</h3>
                    </div>
                    <div className="grid gap-1 ml-auto absolute  top-5 left-12 md:left-14 ">
                      <p className="text-sm text-muted-foreground">
                        {Math.ceil(post.content.split(" ").length / 200)} min
                        read
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="grid gap-2 p-0 mt-4">
                    <h4 className="font-semibold text-xl">{post.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {post.content}
                    </p>
                  </CardContent>
                </div>
                <CardFooter className="p-0 mt-4">
                  <Link to={`/blog-detail/${post.$id}`} className="w-full">
                    <Button className="w-full" variant="outline">
                      Read more
                    </Button>
                  </Link>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="trending">
        <h2 className="text-2xl font-bold mb-6">Trending Posts</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((post, index) => (
            <Card
              key={`trending-${post.id}-${index}`}
              className="flex flex-col"
            >
              <CardHeader>
                <h3 className="text-lg font-semibold">{post.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {post.content}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-sm text-muted-foreground">{post.readTime}</p>
                <Link to={`/blog-detail/${post.$id}`}>
                  <Button variant="ghost" size="sm">
                    Read more
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="latest">
        <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>
        <div className="space-y-6">
          {posts.map((post, index) => (
            <Card
              key={`latest-${post.id}-${index}`}
              className="flex flex-col sm:flex-row overflow-hidden gap-4 justify-between"
            >
              <div className="size-80  h-40 aspect-video object-contain bg-red-500">
                <PostImage post={post} />
              </div>
              <div className="flex flex-col justify-between p-6 flex-grow">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {post.content}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    {post.readTime}
                  </p>
                  <Link to={`/blog-detail/${post.$id}`}>
                    <Button variant="ghost" size="sm">
                      Read more
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
