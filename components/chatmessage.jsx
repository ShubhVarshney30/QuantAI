import React from 'react';

const ChatMessage = ({ sender, text }) => {
  const isUser = sender === 'user';
  return (
    <div style={{
      display: 'flex',
      justifyContent: isUser ? 'flex-end' : 'flex-start',
      padding: '5px 0'
    }}>
      <div style={{
        backgroundColor: isUser ? '#007bff' : '#e0e0e0',
        color: isUser ? 'white' : 'black',
        padding: 10,
        borderRadius: 10,
        maxWidth: '70%'
      }}>
        {text}
      </div>
    </div>
  );
};

export default ChatMessage;
