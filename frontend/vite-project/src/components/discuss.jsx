import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

// Connect to the backend server
const socket = io("https://bytesblog.netlify.app/", {
  withCredentials: true, // Include credentials (important for CORS)
});

const Discuss = () => {
  const [messages, setMessages] = useState([]); // Store all chat messages
  const [newMessage, setNewMessage] = useState(""); // Input field state

  // Listen for messages from the server
  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  // Handle sending messages
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      socket.emit("sendMessage", newMessage); // Send message to the server
      setNewMessage(""); // Clear input field
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen font-playfair bg-black">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left mb-8 lg:mb-0">
          <h1 className="text-5xl font-bold">Discussion Forum</h1>
          <p className="py-6">
            Join the conversation, share your thoughts, and engage with others in real time!
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-lg shadow-2xl">
          <div className="card-body">
            <div className="chat-box h-96 overflow-y-auto border rounded-lg p-4 bg-gray-50">
              {messages.length > 0 ? (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`chat ${index % 2 === 0 ? "chat-start" : "chat-end"} mb-4`}
                  >
                    <div
                      className={`chat-bubble ${
                        index % 2 === 0 ? "bg-blue-500 text-white" : "bg-gray-200"
                      }`}
                    >
                      {msg}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No messages yet. Start the discussion!</p>
              )}
            </div>
            <div className="form-control mt-4">
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Type your message here..."
                  className="input input-bordered flex-1"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button
                  onClick={handleSendMessage}
                  className="btn btn-primary"
                  disabled={!newMessage.trim()}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discuss;
