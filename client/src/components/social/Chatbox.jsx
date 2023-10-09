import React from 'react';
import { FormControl, Button, InputGroup } from 'react-bootstrap';

const Chatbox = ({userId}) => {
  return (
    <div className="chatbox-container">
      <div className="chatbox-messages">
        {/* Hiển thị tin nhắn ở đây */}
      </div>
      <div className="chatbox-input">
        <InputGroup>
          <FormControl
            placeholder="Nhập tin nhắn..."
            aria-label="Tin nhắn"
            aria-describedby="basic-addon2"
          />
            <Button variant="primary">Gửi</Button>
        </InputGroup>
      </div>
    </div>
  );
};

export default Chatbox;
