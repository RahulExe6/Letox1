import { useAuth } from "@/hooks/use-auth";
import { motion } from "framer-motion";
import AvatarWithStatus from "@/components/ui/avatar-with-status";
import EditProfile from "@/components/profile/edit-profile";
import MobileNav from "@/components/ui/mobile-nav"; // Assumed import

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col bg-background" // Added flex-col
    >
      <div className="flex-1 overflow-y-auto"> {/* Wrapped existing content */}
        <div className="max-w-4xl mx-auto pt-8 px-4">
          <div className="flex flex-col items-center bg-card rounded-lg shadow-lg p-8">
            {/* Profile Header */}
            <div className="w-full flex flex-col items-center space-y-6">
              {/* Profile Picture */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative w-40 h-40 rounded-full border-4 border-primary/10 shadow-xl overflow-hidden"
              >
                <AvatarWithStatus
                  src={user.profilePicture}
                  username={user.username}
                  isOnline={true}
                  size="lg"
                  showStatus={false}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </motion.div>

              {/* User Info */}
              <div className="text-center space-y-3">
                <h1 className="text-3xl font-bold tracking-tight">{user.name || user.username}</h1>
                <p className="text-muted-foreground">@{user.username}</p>
              </div>

              {/* Edit Profile Button */}
              <div className="w-full max-w-xs">
                <EditProfile />
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileNav /> {/* Added MobileNav component */}
    </motion.div>
  );
}