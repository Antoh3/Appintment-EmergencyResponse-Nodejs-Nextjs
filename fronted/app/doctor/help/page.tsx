import React from 'react';
import ChatWindow from '@/components/chat/Chat';

export default function SiteHelp() {
  const userId = 2; // Replace with the actual user ID, e.g. from the authenticated session
  const receiverId = 1; // Replace with the actual receiver's ID
  
  return <ChatWindow userId={userId} receiverId={receiverId} />;
}
