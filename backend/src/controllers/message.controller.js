import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id; // we want to display all users except logged in one
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password"); // ne: not equal to

    res.status(200).json(filteredUsers);
  } catch (e) {
    console.error("Error in getUsersForSidebar: ", e.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

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

    let imageUrl;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    if (!image && !text) {
      return res.status(400).json({ message: "Atleast 1 field required" });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    await newMessage.save();
    return res.status(200).json(newMessage);
  } catch (e) {
    console.log("Error in sendMessage: ", e.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
