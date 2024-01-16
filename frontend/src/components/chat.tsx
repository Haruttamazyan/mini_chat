import React, { useCallback, useContext, useEffect, useState } from 'react';
import { WebSocketContext } from '../contexts/WebSocketContext';
import Messages from './message'
import './Chat.css';
import NameForm from './nameForm';
import NewMessageForm from './newMessageForm';

interface Message {
  id: number;
  username: string;
  type: 'join' | 'message';
  message: string;
}

const Chat: React.FC = () => {
  // Access the WebSocket context to get the socket instance
  const socket = useContext(WebSocketContext);

  // State to store chat messages
  const [messages, setMessages] = useState<Message[]>([]);

  // State to store the user's name
  //const [name, setName] = useState<string>('');

  const [err, setErr] = useState('')

  // State to control the visibility of the modal
  const [show, setShow] = useState(true);

  const [username, setUsername] = useState('')

  // useEffect to set up socket event listeners and clean up on unmount
  useEffect(() => {
    // Function to handle incoming chat messages
    const handleChat = (data: any) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    // Function to handle user existence check response
    const handleUserExist = (data: any) => {
      setErr(data)
    };

    // Function to handle previous messages received from the server
    const handlePreviousMessages = (data: any) => {
      setMessages(data);
      setShow(false);
      setErr('')
    };

    // Set up event listeners for socket events
    socket.on('chat', handleChat);
    socket.on('userExist', handleUserExist);
    socket.on('previousMessages', handlePreviousMessages);

    // Clean up event listeners on component unmount
    return () => {
      socket.off('chat', handleChat);
      socket.off('userExist', handleUserExist);
      socket.off('previousMessages', handlePreviousMessages);
    };
  }, [socket]);

  const sendNewMessage = useCallback((message: string) => {
    socket.emit('chat', message);
  }, [socket]);

  const handleJoin = useCallback((name: string) => {
    socket.emit('join', name);
    setUsername(name)
  },[socket]);

  return (
    <>
    {!show && 
    <div className="chat-container">
        
    <div className="chat-header">Group Chat</div>
    <div className="chat-messages">
      {messages.map((message: Message) => (
        <Messages key={message.id} message={message} owner={username} />
      ))}
    </div>
    <NewMessageForm sendNewMessage={sendNewMessage} />
  </div>
  }
      {show && (
        <NameForm joinHandler={handleJoin} error={err} />
      )}
    </>
  );
};

export default Chat;