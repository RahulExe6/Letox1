import { useAuth } from "@/hooks/use-auth";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import AvatarWithStatus from "@/components/ui/avatar-with-status";
import EditProfile from "@/components/profile/edit-profile";

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
        <div className="flex flex-col items-center">
          {/* Profile Picture */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-32 h-32 mb-6"
          >
            <AvatarWithStatus
              src={user.profilePicture}
              username={user.username}
              isOnline={true}
              size="lg"
              className="w-full h-full rounded-full border-4 border-background shadow-lg"
            />
          </motion.div>

          {/* User Info */}
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-2xl font-semibold">{user.name || user.username}</h1>
            <p className="text-sm text-muted-foreground">@{user.username}</p>
          </div>

          {/* Edit Profile Button */}
          <EditProfile />
        </div>
      </div>
    </motion.div>
  );
}