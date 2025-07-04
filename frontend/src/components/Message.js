import React from 'react';

function Message({ sender, text }) {
  return <div className={`message ${sender}`}>{text}</div>;
}

export default Message;