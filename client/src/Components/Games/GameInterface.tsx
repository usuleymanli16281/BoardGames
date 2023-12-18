import React, { useContext, useState, useRef, useEffect } from "react";
import { MainContext } from "../../context";

interface Message {
  user: string;
  text: string;
}

const GameInterface: React.FC = () => {
  const { name } = useContext(MainContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { text: newMessage, user: name }]);
      setNewMessage("");
    }
  };

  const handleKeyEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the messages container when new messages are added
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex h-screen bg-gray-100 border-2 border-y-black">
      <div className="flex-1 flex">
        <div className="flex-1 bg-gray-800 p-6 text-white">
          {/* Your game component goes here */}
          <h1 className="text-3xl font-bold">Your Game Area</h1>
        </div>
        <div className="w-1/4 bg-white border-l border-gray-300 p-6 flex flex-col h-full">
          <div
            className="h-full overflow-y-auto"
            ref={messagesContainerRef}
          >
            {messages.map((message, index) => (
              <div key={index} className="mb-2">
                <strong>{message.user}:</strong> {message.text}
              </div>
            ))}
          </div>
          <div className="flex mt-4">
            <input
              type="text"
              className="flex-1 border rounded-l py-2 px-4"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyEnter}
            />
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-r"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameInterface;
