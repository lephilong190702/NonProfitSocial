import React, { useState } from 'react';
import { FormControl, Button, InputGroup, Card } from 'react-bootstrap';

const Chatbox = ({ userId }) => {

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');


  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, newMessage]);
      setNewMessage('');
    }
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-messages">
        <Card>
          <Card.Body>
            <Card.Title>BoxChat của bạn {userId}</Card.Title>
            <hr/>
            <div className="message-box">
              {messages.map((message, index) => (
                <div key={index} className="message">
                  {message}
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      </div>
      <div className="chatbox-input mt-2">
        <InputGroup>
          <FormControl
            placeholder="Nhập tin nhắn..."
            aria-label="Tin nhắn"
            aria-describedby="basic-addon2"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button variant="primary" onClick={sendMessage}>Gửi {userId}</Button>
        </InputGroup>
      </div>
    </div>
  );
};

export default Chatbox;
