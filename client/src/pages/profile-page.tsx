
import { useAuth } from "@/hooks/use-auth";
import { motion } from "framer-motion";
import AvatarWithStatus from "@/components/ui/avatar-with-status";
import EditProfile from "@/components/profile/edit-profile";
import MobileNav from "@/components/ui/mobile-nav";
import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col bg-gradient-to-br from-background to-background/50"
    >
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="max-w-4xl mx-auto pt-8 px-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative backdrop-blur-xl bg-card/80 rounded-2xl shadow-xl p-8 border border-border/50"
          >
            {/* Profile Header */}
            <div className="flex flex-col items-center space-y-6">
              {/* Profile Picture Container */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative group"
              >
                <div className="w-40 h-40 rounded-full border-4 border-primary/10 shadow-xl overflow-hidden">
                  <AvatarWithStatus
                    src={user.profilePicture}
                    username={user.username}
                    isOnline={true}
                    size="lg"
                    showStatus={true}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                {/* Hover Effect for Picture Change */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                {/* Online Status Badge */}
                <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-4 border-background" />
              </motion.div>

              {/* User Info */}
              <div className="text-center space-y-3 w-full max-w-md">
                <motion.h1 
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent"
                >
                  {user.name || user.username}
                </motion.h1>
                <motion.p 
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-muted-foreground"
                >
                  @{user.username}
                </motion.p>
                
                {/* Bio Section */}
                <motion.p
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-foreground/80 text-sm mt-4"
                >
                  {user.bio || "No bio yet"}
                </motion.p>

                {/* Divider */}
                <div className="w-full h-px bg-border/50 my-6" />

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 justify-center">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="w-full max-w-[200px]"
                  >
                    <EditProfile />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <MobileNav />
    </motion.div>
  );
}
