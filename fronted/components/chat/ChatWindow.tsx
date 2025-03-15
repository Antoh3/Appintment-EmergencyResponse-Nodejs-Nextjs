"use client";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";
import Header from "./Header";  

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #f0f0f0;
  max-width: 600px; /* Set a maximum width for the chat */
  width: 100%;
  margin: 50px auto; /* Center chat container */
  border-radius: 8px;
`;

const MessagesContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow-y: auto;
  max-height: 400px; /* Set a maximum height for the messages */
`;

const MessageBubble = styled.div<{ $isSender: boolean }>`
  max-width: 60%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  color: white;
  background: ${({ $isSender }) => ($isSender ? "#007AFF" : "#34C759")};
  align-self: ${({ $isSender }) => ($isSender ? "flex-end" : "flex-start")};
`;

const TimeStamp = styled.span`
  font-size: 12px;
  color: #fff;
  display: block;
  text-align: right;
  margin-top: 5px;
`;

const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  background: #fff;
`;

const InputField = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SendButton = styled.button`
  padding: 10px;
  margin-left: 10px;
  background: #007aff;
  color: white;
  border: none;
  border-radius: 5px;
`;

export default function ChatWindow({ messages, message, setMessage, sendMessage, userId }: any) {
  const [newMessage, setNewMessage] = useState(""); // Track new message before sending

  useEffect(() => {
    // Scroll to the bottom when new messages are added
    const messagesContainer = document.getElementById("messagesContainer");
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages]); // This runs when the messages change

  const handleSend = async () => {
    // Send the message
    if (newMessage.trim() === "") return;

    await sendMessage(newMessage);
    setMessage(""); // Clear the input after sending
    setNewMessage(""); // Reset the new message state
  };

  return (
    <ChatContainer>
        <Header />
      {/* Messages */}
      <MessagesContainer id="messagesContainer">
        {messages.map((msg:any) => (
          <MessageBubble key={msg.id} $isSender={msg.senderId === userId}>
            {msg.content}
            <TimeStamp>{new Date(msg.createdAt).toLocaleTimeString()}</TimeStamp>
          </MessageBubble>
        ))}
      </MessagesContainer>

      {/* Input Field */}
      <InputContainer>
        <InputField
          value={newMessage}
          className="text-black"
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <SendButton onClick={handleSend}><FiSend /></SendButton>
      </InputContainer>
    </ChatContainer>
  );
}
