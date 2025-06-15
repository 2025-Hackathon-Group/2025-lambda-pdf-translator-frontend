import React, { useState, useRef, useEffect } from 'react';
import './ChatBox.css';

const ChatBox = () => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  // Auto-resize textarea as user types
  const handleInput = (e) => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`; // Max height of 150px
    setMessage(e.target.value);
  };

  return (
    <div className="chat-container">
      <div className="messages-area">
        {/* Messages will appear here */}
      </div>
      
      <div className="input-area">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleInput}
          placeholder="Ask a question about your document..."
          className="message-input"
          rows="1"
        />
        <button className="send-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatBox;