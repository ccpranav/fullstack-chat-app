import React, { useState } from "react";
import { Camera, Mail, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

export default function ProfilePage() {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-neutral-900 rounded-2xl shadow-xl p-8 flex flex-col items-center text-gray-200">
        {/* Profile Picture */}
        <div className="relative group">
          <img
            src={selectedImg || authUser.profilePic}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-2 border-gray-700 shadow-lg transition-transform duration-300 group-hover:scale-105"
          />
          <label
            htmlFor="profile-upload"
            className="absolute bottom-1 right-1 bg-gray-800 p-2 rounded-full cursor-pointer hover:bg-gray-700 transition"
          >
            <Camera className="w-4 h-4 text-gray-200" />
            <input
              type="file"
              id="profile-upload"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              disabled={isUpdatingProfile}
            />
          </label>
        </div>
        <p className="text-xs text-zinc-400 mt-3  opacity-80">
          {isUpdatingProfile
            ? "Updating profile..."
            : "Click the camera icon to update your profile picture"}
        </p>

        {/* Profile Info */}
        <div className="mt-6 w-full space-y-4">
          <div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-200" />
              <label className="text-sm text-gray-400">Username</label>
            </div>
            <input
              type="text"
              value={authUser.fullName}
              disabled
              className="mt-1 w-full bg-neutral-800 text-gray-100 rounded-lg px-3 py-2 border border-neutral-700 cursor-not-allowed"
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-200" />
              <label className="text-sm text-gray-400">Email</label>
            </div>
            <input
              type="text"
              value={authUser.email}
              disabled
              className="mt-1 w-full bg-neutral-800 text-gray-100 rounded-lg px-3 py-2 border border-neutral-700 cursor-not-allowed"
            />
          </div>

          {/* Separator */}
          <div className="border-t border-neutral-700 my-4"></div>

          {/* Member Since */}
          <div className="flex justify-between text-sm text-gray-400">
            <span>Member since</span>
            <span className="text-green-400 font-light">
              {authUser.createdAt?.split("T")[0]}
            </span>
          </div>

          {/* Account Status */}
          <div className="flex justify-between text-sm text-gray-400">
            <span>Account status</span>
            <span className="text-green-400 font-light">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
