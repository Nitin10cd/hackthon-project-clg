import { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext";
import { FiArrowLeft } from "react-icons/fi";
import { IoSend } from "react-icons/io5";
import io from "socket.io-client";
import "./Messaging.css";

const MessagingCont = () => {
  const { user, friendChat, setFriendChat } = useApp();
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (friendChat) {
      fetchUser();
      fetchMessages();
    }
  }, [friendChat]);

  useEffect(() => {
    const socketInstance = io("http://localhost:5000");
    setSocket(socketInstance);
    let myId=user._id;
    if(user.role==="Teacher") myId=user.id;
    socketInstance.emit("join",myId);
    socketInstance.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    return () => {
      socketInstance.disconnect();
    };
  }, [user]);

  const fetchUser = async () => {
    try {
      let myId=user._id;
      if(user.role==="Teacher") myId=user.id;
      const response = await fetch("http://localhost:5000/api/chat/fetchUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: friendChat }),
      });
      const { data } = await response.json();
      setChat(data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const fetchMessages = async () => {
    try {
      let myId=user._id;
      if(user.role==="Teacher") myId=user.id;
      const response = await fetch("http://localhost:5000/api/message/fetchMessages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId:myId,
          receiverId: friendChat,
        }),
      });
      const { data } = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSend = () => {
    let myId=user._id;
    if(user.role==="Teacher") myId=user.id;
    if (!newMessage.trim() || !chat?.role) return;
    const messageData = {
      sender:myId,
      receiver: friendChat,
      content: newMessage,
      messageType: "text",
    };
    socket.emit("sendMessage", messageData);
    setMessages((prev) => [...prev, { ...messageData, _id: Date.now() }]);
    setNewMessage("");
  };

  if (!chat) return <div className="messaging-placeholder">Select a chat to start messaging.</div>;

  return (
    <div className="messaging-container">
      <div className="chat-header">
        <FiArrowLeft className="back-icon" onClick={() => setFriendChat(null)} />
        <div className="chat-user-info">
          <h3>{chat.name}</h3>
          <p>{chat.rollno || chat.teach_id}</p>
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === (user._id || user.id) ? "my-message" : "their-message"}`}
          >
            {msg.content}
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

export default MessagingCont;
