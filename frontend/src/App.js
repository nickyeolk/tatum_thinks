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
      // Prepare conversation history for API
      const conversation = newMessages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));

      // Send conversation history to the backend API
      const response = await axios.post('http://localhost:5001/api/chat', {
        messages: conversation,
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

  // File upload handler
  const handleFileUpload = async (file) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('http://localhost:5001/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessages([
        ...messages,
        { sender: 'bot', text: response.data.message || 'File uploaded successfully.' },
      ]);
    } catch (error) {
      setMessages([
        ...messages,
        { sender: 'bot', text: 'File upload failed.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <ChatWindow messages={messages} />
      <ChatInput onSendMessage={sendMessage} isLoading={isLoading} onFileUpload={handleFileUpload} />
    </div>
  );
}

export default App;