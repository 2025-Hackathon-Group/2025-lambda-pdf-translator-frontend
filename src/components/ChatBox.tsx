import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import './ChatBox.css';

interface ChatBoxProps {
  onSendMessage: (message: string) => void;
  messages: ChatMessage[];
}

const ChatBox: React.FC<ChatBoxProps> = ({ onSendMessage, messages }) => {
  const [inputMessage, setInputMessage] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Auto-resize textarea as user types
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`; // Max height of 150px
    }
    setInputMessage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      onSendMessage(inputMessage);
      setInputMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="messages-area">
        {/* Messages will appear here */}
      </div>
      
      <form className="input-area" onSubmit={handleSubmit}>
        <textarea
          ref={textareaRef}
          value={inputMessage}
          onChange={handleInput}
          placeholder="Ask a question about your document..."
          className="message-input"
          rows={1}
        />
        <button type="submit" className="send-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatBox;