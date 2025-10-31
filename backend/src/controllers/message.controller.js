import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // Step 1: Find all messages where the logged-in user is either the sender or receiver
    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    }).select("senderId receiverId");

    // Step 2: Extract unique user IDs from these messages (excluding yourself)
    const userIds = new Set();

    messages.forEach((msg) => {
      if (msg.senderId.toString() !== loggedInUserId.toString()) {
        userIds.add(msg.senderId.toString());
      }
      if (msg.receiverId.toString() !== loggedInUserId.toString()) {
        userIds.add(msg.receiverId.toString());
      }
    });

    // Step 3: Get user details for all those unique IDs
    const users = await User.find({ _id: { $in: [...userIds] } }).select(
      "-password"
    );

    // Step 4: Send them to the frontend
    res.status(200).json(users);
  } catch (error) {
    console.error("Error in getUsersForSidebar:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    // 👇 Skip DB logic for AI Chat
    if (userToChatId === "ai-chat") {
      return res.status(200).json([]); // return empty messages initially
    }

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (e) {
    console.log("Error in getMessages: ", e.message);
    res.status(500).json({ error: "Internal Erver Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    if (receiverId === "ai-chat") {
      return res
        .status(200)
        .json({ message: "AI messages handled client-side." });
    }

    let imageUrl;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    if (!image && !text) {
      //T and F
      return res.status(400).json({ message: "Atleast 1 field required" });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(200).json(newMessage);
  } catch (e) {
    console.log("Error in sendMessage: ", e.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const startNewChat = async (req, res) => {
  try {
    const { email } = req.body;
    const loggedInUserId = req.user._id;

    const otherUser = await User.findOne({ email }).select("-password");
    if (!otherUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (otherUser._id.equals(loggedInUserId)) {
      return res
        .status(400)
        .json({ message: "You cannot start a chat with yourself" });
    }

    // Check if chat already exists (i.e. at least one message)
    const existingChat = await Message.findOne({
      $or: [
        { senderId: loggedInUserId, receiverId: otherUser._id },
        { senderId: otherUser._id, receiverId: loggedInUserId },
      ],
    });

    // // If no chat exists, create a dummy first message or just skip
    // if (!existingChat) {
    //   await Message.create({
    //     senderId: loggedInUserId,
    //     receiverId: otherUser._id,
    //     text: "", // optional placeholder
    //   });
    // }

    res.status(200).json(otherUser);
  } catch (e) {
    console.error("Error in startNewChat:", e.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
