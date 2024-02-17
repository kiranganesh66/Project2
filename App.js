import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    const socket = io("http://localhost:3000"); // Replace with your server address

    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });

    return () => socket.disconnect();
  }, []);

  const sendMessage = () => {
    // Send message to server using socket.emit
    socket.emit("message", messageInput);
    setMessageInput("");
  };

  return (
    <div className="chat-window">
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.text}</li>
        ))}
      </ul>
      <input
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatWindow;
