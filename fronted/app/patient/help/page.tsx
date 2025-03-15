import React from 'react'
import ChatWindow from '@/components/chat/Chat';

export const metadata = {
  title: "help",
};

function SiteHelp() {
  const userId = 1; // Replace with the actual user ID, e.g. from the authenticated session
  const receiverId = 2; // Replace with the actual receiver's ID

  return <ChatWindow userId={userId} receiverId={receiverId} />;

}

export default SiteHelp