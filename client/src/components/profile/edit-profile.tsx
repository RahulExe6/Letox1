
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Camera } from "lucide-react";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function EditProfile() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const defaultAvatar = `https://api.dicebear.com/7.x/micah/svg?seed=${Date.now()}`;
  const [profilePicture, setProfilePicture] = useState(defaultAvatar);
  const [showAvatars, setShowAvatars] = useState(false);

  const avatarOptions = Array.from({ length: 6 }, (_, i) => 
    `https://api.dicebear.com/7.x/micah/svg?seed=${i + 1}`
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await apiRequest("PATCH", "/api/user/profile", { name, profilePicture });
      toast({ description: "Profile updated successfully!" });
      setShowAvatars(false);
      setIsOpen(false);
      window.location.reload();
    } catch (error) {
      toast({ description: "Failed to update profile", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full max-w-[200px]">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <motion.div 
              className="relative w-24 h-24 cursor-pointer group"
              whileHover={{ scale: 1.05 }}
              onClick={() => setShowAvatars(!showAvatars)}
            >
              <img 
                src={profilePicture} 
                alt="Profile" 
                className="w-full h-full rounded-full object-cover border-2 border-primary/20"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </motion.div>

            {showAvatars && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-3 gap-2 p-2 bg-muted rounded-lg"
              >
                {avatarOptions.map((avatar, index) => (
                  <div
                    key={index}
                    className={`w-16 h-16 rounded-full cursor-pointer transition-transform hover:scale-110 ${
                      profilePicture === avatar ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setProfilePicture(avatar)}
                  >
                    <img src={avatar} alt="Avatar option" className="w-full h-full rounded-full" />
                  </div>
                ))}
              </motion.div>
            )}

            <Input
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="max-w-xs"
            />
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
