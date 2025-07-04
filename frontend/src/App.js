import React, { useState } from 'react';
import axios from 'axios';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';

function App() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I help you today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    // Add user message to the chat
    const newMessages = [...messages, { sender: 'user', text: message }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Send message to the backend API
      const response = await axios.post('http://localhost:5001/api/chat', {
        message: message,
      });

      // Add bot response to the chat
      setMessages([
        ...newMessages,
        { sender: 'bot', text: response.data.response },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages([
        ...newMessages,
        { sender: 'bot', text: 'Sorry, something went wrong. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <ChatWindow messages={messages} />
      <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
    </div>
  );
}

export default App;