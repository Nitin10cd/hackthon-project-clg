import { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext";
import { FiArrowLeft } from "react-icons/fi";
import { IoSend } from "react-icons/io5";
import io from "socket.io-client";
import "./Messaging.css";

const GroupMessaging = () => {
  const { user, groupChat, setGroupChat } = useApp();
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (groupChat) {
      fetchGroup();
      fetchGroupMessages();
    }
  }, [groupChat]);

  useEffect(() => {
    const socketInstance = io("http://localhost:5000");
    setSocket(socketInstance);
    socketInstance.emit("join", user._id);
    if (groupChat) {
      socketInstance.emit("joinGroup", groupChat);
    }
    socketInstance.on("receiveGroupMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    return () => {
      socketInstance.disconnect();
    };
  }, [user._id, groupChat]);

  const fetchGroup = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/chat/fetchGroup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ groupId: groupChat }),
      });
      const { data } = await response.json();
      setChat(data);
    } catch (error) {
      console.error("Error fetching group:", error);
    }
  };

  const fetchGroupMessages = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/message/fetchGroupMessages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ groupId: groupChat }),
      });
      const { data } = await response.json();
      console.log(data)
      setMessages(data);
    } catch (error) {
      console.error("Error fetching group messages:", error);
    }
  };

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const messageData = {
      sender: user._id,
      groupId: groupChat,
      content: newMessage,
      messageType: "text",
    };
    socket.emit("sendGroupMessage", messageData);
    setMessages((prev) => [
      ...prev,
      { ...messageData, _id: Date.now(), senderName: user.name }, // Add sender's name
    ]);
    setNewMessage("");
  };

  if (!chat) return <div className="messaging-placeholder">Select a group to start messaging.</div>;

  return (
    <div className="messaging-container">
      <div className="chat-header">
        <FiArrowLeft className="back-icon" onClick={() => setGroupChat(null)} />
        <div className="chat-user-info">
          <h3>{chat.chatName}</h3>
          <p>Group Chat</p>
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === user._id ? "my-message" : "their-message"}`}
          >
            <div className="sender-name">{msg.senderName}</div>
            <div className="message-content">{msg.content}</div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>
          <IoSend size={20} />
        </button>
      </div>
    </div>
  );
};

export default GroupMessaging;
