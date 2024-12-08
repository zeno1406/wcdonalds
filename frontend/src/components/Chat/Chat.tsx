import React, { useState, useEffect } from 'react';
import ChatIcon from './ChatIcon';
import ChatBox from './ChatBox';
import './chat.css';

const Chat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isMobile) {
      document.body.style.overflow = !isOpen ? 'hidden' : 'auto';
    }
  };

  return (
    <div className="chat-wrapper">
      {isOpen && <ChatBox isMobile={isMobile} onClose={toggleChat} />}
      <ChatIcon onClick={toggleChat} isOpen={isOpen} />
    </div>
  );
};

export default Chat;
