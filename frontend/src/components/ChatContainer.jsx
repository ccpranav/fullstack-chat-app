import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import { Link } from "react-router-dom";
import axios from "axios";

const ChatContainer = () => {
  const {
    selectedUser,
    messages,
    getMessages,
    isMessageLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();

  const [aiMessages, setAiMessages] = useState([
    {
      sender: "ai",
      text: "Hi! I'm your AI assistant. How can I help you today?",
    },
  ]);
  const [loading, setLoading] = useState(false); // 👈 typing indicator state

  useEffect(() => {
    if (selectedUser?._id) getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [
    selectedUser?._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  useLayoutEffect(() => {
    scrollToBottom();
  }, []);
  useEffect(() => {
    scrollToBottom();
  }, [messages, aiMessages, loading]);

  // ✅ Typing bubble animation (3 dots)
  const AITypingIndicator = () => (
    <div className="chat chat-start">
      <div className="chat-image avatar">
        <div className="size-10 rounded-full border overflow-hidden">
          <img
            src={selectedUser?.profilePic}
            alt="ai"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="chat-bubble bg-zinc-800 flex items-center justify-center">
        <div className="flex space-x-1">
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-.2s]"></span>
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-.4s]"></span>
        </div>
      </div>
    </div>
  );

  if (isMessageLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-y-auto">
        <ChatHeader />
        <MessageSkeleton />
      </div>
    );
  }

  if (selectedUser?.isAI) {
    return (
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="border-b border-base-300 p-4 font-semibold text-lg">
          🤖 {selectedUser.fullName}
        </div>

        <div className="flex-1 flex flex-col overflow-y-auto p-4 space-y-4">
          {aiMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`chat ${
                msg.sender === "user" ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border overflow-hidden">
                  <img
                    src={
                      msg.sender === "user"
                        ? authUser.profilePic
                        : selectedUser.profilePic
                    }
                    alt={msg.sender}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="chat-bubble">{msg.text}</div>
            </div>
          ))}
          {loading && <AITypingIndicator />} {/* 👈 typing bubble */}
          <div ref={messagesEndRef} />
        </div>

        <MessageInput
          onSend={async (text) => {
            if (!text.trim()) return;
            setAiMessages((prev) => [...prev, { sender: "user", text }]);
            setLoading(true);

            try {
              const res = await axios.post("http://localhost:5001/api/ai", {
                prompt: text,
              });
              const reply = res.data.reply || "Sorry, I couldn’t process that.";
              setAiMessages((prev) => [...prev, { sender: "ai", text: reply }]);
            } catch (err) {
              setAiMessages((prev) => [
                ...prev,
                {
                  sender: "ai",
                  text: `Error connecting to AI: ${err.message}`,
                },
              ]);
            } finally {
              setLoading(false);
            }
          }}
        />
      </div>
    );
  }

  // ✅ Normal user-to-user chat
  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <ChatHeader />
      <div className="flex-1 flex flex-col overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border overflow-hidden">
                {message.senderId === authUser._id ? (
                  <Link to="/profile">
                    <img
                      src={authUser.profilePic}
                      alt={authUser.fullName}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                ) : (
                  <img
                    src={selectedUser.profilePic}
                    alt={selectedUser.fullName}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>

            <div className="chat-header mb-1">
              <time className="text-xs opacity-50">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
