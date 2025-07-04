import React, { useEffect, useRef } from 'react';
import Message from './Message';

function ChatWindow({ messages }) {
  const endOfMessagesRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        <Message key={index} sender={msg.sender} text={msg.text} />
      ))}
      <div ref={endOfMessagesRef} />
    </div>
  );
}

export default ChatWindow;