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
import { useSelector } from "react-redux";
export default function ProfilePage() {
  const { userData } = useSelector((state) => state.auth);
  console.log(userData);
  const [profile, setProfile] = useState({
    name: userData?.name,
    email: userData?.email,
    bio: userData?.bio,
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
          <label className="block text-sm font-medium mb-1">Status</label>
          {userData.status ? "true" : "false"}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Created</label>
          {new Date(userData.$createdAt).toLocaleDateString()}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Email verified
          </label>
          {userData.$verified ? "Yes" : "No"}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full " disabled>
          Update Profile
        </Button>
      </CardFooter>
    </Card>
  );
}
