import React, { useState } from 'react';

function ChatInput({ onSendMessage, isLoading, onFileUpload }) {
  const [input, setInput] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendMessage(input);
    setInput('');
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    if (file && onFileUpload) {
      onFileUpload(file);
      setFile(null);
      e.target.reset();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What's your problem?"
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? (
            <div className="loader"></div>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          )}
        </button>
      </form>
      <form onSubmit={handleFileUpload} className="file-upload-form">
        <input
          type="file"
          accept=".pdf,.xls,.xlsx"
          onChange={handleFileChange}
          disabled={isLoading}
        />
        <button type="submit" disabled={!file || isLoading}>Upload</button>
      </form>
    </>
  );
}

export default ChatInput;