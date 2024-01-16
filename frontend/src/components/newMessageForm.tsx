import React, { MouseEventHandler, memo, useEffect, useState, useCallback } from "react";

interface NewMessageFormProps {
    sendNewMessage: (message: string) => void;
}

const NewMessageForm: React.FC<NewMessageFormProps> = memo(({ sendNewMessage }) => {
  const [message, setMessage] = useState('');

  const send = useCallback(() => {
      sendNewMessage(message)
      setMessage('')
  },[message])

  return (
    <div className="chat-input">
      <input
        type="text"
        placeholder="Type your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={send}>Send</button>
    </div>
  );
});

export default NewMessageForm;