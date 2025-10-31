import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { LogOutIcon, Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { startNewChat, isStartingChat } = useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [email, setEmail] = useState("");

  const handleStartChat = async () => {
    if (!email.trim()) return toast.error("Please enter an email");
    await startNewChat(email);
    setEmail("");
    setShowAddModal(false);
  };

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <>
      <aside className="h-full w-20 lg:w-[30rem] border-r border-base-300 flex flex-col justify-between transition-all duration-200">
        {/* Header */}
        <div>
          <div className="border-b border-base-300 w-full p-5 space-y-2">
            <div className="flex items-center gap-2 pl-3">
              <Users className="size-6" />
              <span className="font-medium hidden lg:block">Contacts</span>
            </div>
            {/* AI Chat Section */}
            <button
              onClick={() =>
                setSelectedUser({
                  _id: "ai-chat",
                  fullName: "AI Assistant",
                  profilePic:
                    "https://cdn-icons-png.flaticon.com/512/4712/4712027.png", // any AI icon
                  isAI: true,
                })
              }
              className={`w-full flex items-center gap-3 p-2 rounded-md hover:bg-base-300 transition-colors ${
                selectedUser?._id === "ai-chat"
                  ? "bg-base-300 ring-1 ring-base-300"
                  : ""
              }`}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
                alt="AI"
                className="size-10 object-cover rounded-full"
              />
              <div className="hidden lg:block text-left">
                <div className="font-medium truncate">AI Assistant</div>
                <div className="text-sm text-zinc-400">Chat with AI</div>
              </div>
            </button>
          </div>

          {/* Scrollable users list */}
          <div className="overflow-y-auto w-full py-3 pl-3 flex-1">
            {users.map((user) => (
              <button
                key={user._id}
                onClick={() => {
                  if (selectedUser?._id !== user._id) {
                    setSelectedUser(user);
                  }
                }}
                className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${
                  selectedUser?._id === user._id
                    ? "bg-base-300 ring-1 ring-base-300"
                    : ""
                }`}
              >
                <div className="relative mx-auto lg:mx-0">
                  <img
                    src={user.profilePic}
                    alt={user.name}
                    className="size-12 object-cover rounded-full"
                  />
                  {onlineUsers.includes(user._id) && (
                    <span
                      className={`absolute bottom-0 right-0 size-3 rounded-full ring-2 ring-zinc-900 ${
                        user.email === "pc8210@srmist.edu.in"
                          ? "bg-red-500"
                          : "bg-green-500"
                      }`}
                    />
                  )}
                </div>
                <div className="hidden lg:block text-left min-w-0">
                  <div className="font-medium truncate">{user.fullName}</div>
                  <div className="text-sm text-zinc-400">
                    {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Fixed bottom Add Chat button */}
        {/* Bottom section with Add Chat + Profile/Logout */}
        {/* Bottom section with Add Chat + Profile/Logout */}
        <div className="border-t border-gray-700 p-3 space-y-3">
          {/* Add New Chat button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="w-full bg-zinc-700 hover:bg-zinc-600 text-white py-2 rounded-md text-sm flex items-center justify-center"
          >
            <span className="block lg:hidden text-lg">+</span>
            <span className="hidden lg:block">+ Add New Chat</span>
          </button>

          {/* Profile + Logout section */}
          {/* Profile + Logout section */}
          <div className="flex justify-center">
            {/* Large screens: Profile + Logout box */}
            <div className="hidden lg:flex bg-zinc-800 px-3 py-2 rounded-md items-center justify-between w-full">
              <Link to="/profile">
                <div className="flex items-center gap-2">
                  <img
                    src={useAuthStore.getState().authUser?.profilePic}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium text-white truncate max-w-[100px]">
                    {useAuthStore.getState().authUser?.fullName || "User"}
                  </span>
                </div>
              </Link>
              <button
                onClick={() => useAuthStore.getState().logout()}
                className="text-red-400 hover:text-red-500 text-sm font-medium"
              >
                Logout
              </button>
            </div>

            {/* Small & medium screens: red logout icon button */}
            <button
              onClick={() => useAuthStore.getState().logout()}
              className="lg:hidden w-full bg-red-600 hover:bg-red-500 text-white py-2 rounded-md text-lg flex items-center justify-center"
              title="Logout"
            >
              <LogOutIcon size={22} />
            </button>
          </div>
        </div>
      </aside>
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold text-white mb-3">
              Start New Chatt
            </h2>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white mb-3"
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-1 bg-gray-600 rounded text-white"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 rounded text-white"
                onClick={handleStartChat}
              >
                Start Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
