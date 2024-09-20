import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    bio: "Passionate blogger and tech enthusiast",
  });

  const handleUpdate = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold">My Profile</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <Input
            value={profile.name}
            onChange={(e) => handleUpdate("name", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input
            type="email"
            value={profile.email}
            onChange={(e) => handleUpdate("email", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Bio</label>
          <Textarea
            value={profile.bio}
            onChange={(e) => handleUpdate("bio", e.target.value)}
            rows={4}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Update Profile</Button>
      </CardFooter>
    </Card>
  );
}
