import React from 'react';
import { FaUserCircle, FaRobot, FaRegUser } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

function Message({ sender, text }) {
  return (
    <div className={`message ${sender}`}>
      <span className="message-icon">
        {sender === 'user' ? (
          <FaRegUser size={22} color="#0056b3" />
        ) : (
          <FaRobot size={22} color="#888" />
        )}
      </span>
      <span className="message-text">
        <ReactMarkdown>{text}</ReactMarkdown>
      </span>
    </div>
  );
}

export default Message;