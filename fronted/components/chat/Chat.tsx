'use client'; // Added at the top

import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Header from './Header';
import { FiSend } from 'react-icons/fi';
import axios from 'axios';
import { message } from 'antd';

const ChatContainer = styled.div`
  display: flex;
  height: 80vh;
  flex-direction: column;
  background: #f0f0f0;
  max-width: 600px;
  width: 100%;
  margin: 50px auto;
  border-radius: 8px;
`;

const MessagesContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow-y: auto;
  max-height: 400px;
`;

const MessageBubble = styled.div<{ $isSender: boolean }>`
  max-width: 60%;
  position: relative;
  cursor: pointer;
  padding: 9px;
  margin-bottom: 5px;
  border-radius: 8px;
  color: white;
  display: flex;
  flex-direction: column;
  background: ${({ $isSender }) => ($isSender ? '#007AFF' : '#34C759')};
  align-self: ${({ $isSender }) => ($isSender ? 'flex-start' : 'flex-end')};
  border-radius: ${({ $isSender }) => ($isSender ? '25px 0px 25px 25px' : '0px 25px 25px 25px')}
`;

const OptionsMenu = styled.div`
  position: absolute;
  background: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 8px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  top: 100%;
  left: 10px;
  z-index: 10;
`;

const OptionButton = styled.button`
  padding: 5px;
  font-size: 14px;
  color: black;
  border: none;
  background: transparent;
  cursor: pointer;
  &:hover {
    background: #eee;
  }
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

export default function ChatWindow({ userId, receiverId }: { userId: number, receiverId: number }) {
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [selectedMessage, setSelectedMessage] = useState<any>(null);
    const [replyingTo, setReplyingTo] = useState<any>(null);
    
    // Ref to track last message
    const lastMessageRef = useRef<HTMLDivElement | null>(null);

    

    // Function to fetch messages
    const fetchMessages = async () => {
        try {
            const res = await axios.get(`http://localhost:5001/api/messages?user1=${userId}&user2=${receiverId}`);
            // console.log("fetched messages",res.data);

            const latestMessages = res.data.sort((a:any, b:any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            if (messages.length > 0) {
                // Find newly received messages
                const newMessages = latestMessages.filter((msg: { id: any; senderId: number; }) => 
                    !messages.some(m => m.id === msg.id) && msg.senderId !== userId
                );
    
                if (newMessages.length > 0) {
                    newMessages.forEach((msg:any) => {
                        console.log("New message detected:", msg.content);
                        message.success("New message",msg.content)
                        showNotification(msg.content);
                    });
                }else{
                    message.error("No message found")
                }
            }

            setMessages(latestMessages);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const showNotification = async (message:string) => {
        console.log("Triggering notification with message:", message);
        if (Notification.permission === "granted") {
            new Notification("New Message",{
                body:message,
                icon:"/dokta-logo.svg"
            })
        }
    }

    useEffect(() => {
        fetchMessages();

        const interval = setInterval(() => {
            fetchMessages();
        }, 10000);

        // setTimeout(() => {
        //     showNotification("Test message")
        // }, 1000);

        return () => clearInterval(interval);
    }, [userId, receiverId]);

    useEffect(() => {
        if (Notification.permission !== "granted") {
            Notification.requestPermission().then((permision) =>{
                if (permision === "granted") {
                    console.log("permision",Notification.permission);
                    
                    message.success("permision granted");
                }
            })
        }
    }, [])

    // Function to send a message
    const sendMessage = async (content: string) => {
        try {
            const res = await axios.post('http://localhost:5001/api/messages', {
                senderId: userId,
                receiverId: receiverId,
                content,
                replyToMessageId: replyingTo ? replyingTo?.id : null
            });

            setMessages((prevMessages) => [...prevMessages, res.data]);
            setNewMessage("");
            setReplyingTo(null);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const handleSend = () => {
        if (newMessage.trim() === "") return;
        sendMessage(newMessage);
        setNewMessage("");
    };

    const deleteMessage = async (messageId: number | any) => {
        try {
            await axios.delete(`http://localhost:5001/api/message/${messageId}`)
            setMessages((prev) => prev.filter((msg) => msg.id !== messageId))
            setSelectedMessage(null);
        } catch (error) {
            console.error("error in deleting the message", error);
        }
        setSelectedMessage(null);
    };

    const handleReply = (msg:any) => {
        setReplyingTo(msg);
        setSelectedMessage(null);
    };

    // Scroll to last message when messages update
    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <ChatContainer className='bordered'>
            <Header />
            <MessagesContainer>
                {messages.map((msg, index) => (
                    <div
                        key={msg.id}
                        style={{ position: "relative", display: "flex", justifyContent: msg.senderId === userId ? "flex-end" : "flex-start" }}
                        ref={index === messages.length - 1 ? lastMessageRef : null} // Attach ref to last message
                    >
                        <MessageBubble
                            $isSender={msg.senderId === userId}
                            onClick={() => setSelectedMessage(msg.id)}
                        >
                            {msg.replyToMessageId && (
                                <div style={{ fontSize: "12px", color: "#ddd", marginBottom: "5px" }}>
                                    Replying to:{messages.find((m) => m.id === msg.replyToMessageId)?.content}
                                </div>
                            )}
                            {msg.content}
                            <TimeStamp>{new Date(msg.createdAt).toLocaleTimeString()}</TimeStamp>
                        </MessageBubble>

                        {selectedMessage === msg.id && (
                            <OptionsMenu>
                                <OptionButton onClick={() => handleReply(msg)}>Reply</OptionButton>
                                <OptionButton onClick={() => deleteMessage(msg.id)}>Delete</OptionButton>
                            </OptionsMenu>
                        )}
                    </div>
                ))}
            </MessagesContainer>

            {replyingTo && (
                <div style={{ padding: "10px", background: "#ddd", fontSize: "14px" }}>
                    Replying to: {replyingTo.content}
                    <button onClick={() => setReplyingTo(null)} style={{ marginLeft: "10px", color: "red" }}>X</button>
                </div>
            )}

            <InputContainer>
                <InputField
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className='text-black'
                    placeholder="Type a message..."
                />
                <SendButton onClick={handleSend}>
                    <FiSend />
                </SendButton>
            </InputContainer>
        </ChatContainer>
    );
}
