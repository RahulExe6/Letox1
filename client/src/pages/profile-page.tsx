import { useAuth } from "@/hooks/use-auth";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import AvatarWithStatus from "@/components/ui/avatar-with-status";
import { Link } from "wouter";

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background"
    >
      <div className="max-w-md mx-auto pt-8 px-4">
        {/* Top Design Elements */}
        <div className="relative mb-20 pt-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[280px]">
            <div className="relative aspect-[2/1] bg-primary/10 rounded-xl overflow-hidden">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                <AvatarWithStatus
                  src={user.profilePicture}
                  username={user.username}
                  size="lg"
                  className="w-24 h-24 border-4 border-background"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="text-center space-y-2">
          <h1 className="text-xl font-semibold">{user.name || user.username}</h1>
          <p className="text-sm text-muted-foreground">@{user.username}</p>
          <p className="text-sm text-muted-foreground">Replit User</p>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 mt-6">
          <div className="text-center">
            <div className="font-semibold">205</div>
            <div className="text-sm text-muted-foreground">Followers</div>
          </div>
          <div className="text-center">
            <div className="font-semibold">178</div>
            <div className="text-sm text-muted-foreground">Following</div>
          </div>
          <div className="text-center">
            <div className="font-semibold">68</div>
            <div className="text-sm text-muted-foreground">Posts</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <Button variant="outline" className="flex-1">
            Edit Profile
          </Button>
          <Button className="flex-1">
            Add Friends
          </Button>
        </div>

        {/* Photos Section */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">Photos</h2>
            <Link href="/photos" className="text-sm text-primary">See All</Link>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-muted rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}