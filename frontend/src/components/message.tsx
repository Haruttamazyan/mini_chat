import React, { memo, useEffect } from "react";

interface MessagesProps {
  message: any;
  owner: string
}

const Messages: React.FC<MessagesProps> = memo(({ message, owner }) => {

  return (
    <div key={message.id} className={`message ${message.username === owner ? 'admin' : 'user'}`}>
        {message.type === 'join' ? (
        <div className="join-message">
            <small>{message.username} has joined the chat</small>
        </div>
        ) : (
        <>
            <span className="sender">{message.username}:</span>
            <div className="message-text">{message.message}</div>
        </>
        )}
    </div>
          
  );
});

export default Messages;