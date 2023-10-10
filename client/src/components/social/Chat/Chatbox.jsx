import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { FormControl, Button, InputGroup, Card } from 'react-bootstrap';
import { UserContext } from '../../../App';
import { authApi, endpoints } from '../../../configs/ApiConfig';
import { addDoc, collection, getDocs, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import { db } from '../../../configs/Firebase';
import { useParams } from 'react-router-dom';

const Chatbox = () => {

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messageRef = collection(db, "messages")
  const [user] = useContext(UserContext);

  const sendMessage = async (evt) => {
    evt.preventDefault();
    if (newMessage.trim() === "") {
      return;
    }

    try {
      let res = await authApi().post(endpoints["chat"], {
        content: newMessage,
        userId: user.id,
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    const fetchMessage = async () => {
      const queryMessages = query(
        messageRef,
        orderBy("createAt")
      );

      const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
        let messages = []
        snapshot.forEach((doc) => {
          messages.push({ ...doc.data(), id: doc.id })
        })
        setMessages(messages)
      })
      return () => unsuscribe()
    }

    fetchMessage()
  }, [])


  return (
    <div className="chatbox-container mt-3">
      <div className="chatbox-messages">
        <Card>
          <Card.Body>
            <Card.Title>NONPROFIT SOCIAL NETWORK CHATGROUP</Card.Title>
            <hr />
            <div className="message-box" style={{ height: "400px", overflowY: "auto" }}>
              {
                messages?.map((newMessage, i) => (
                  <p key={i} >
                    {newMessage.content}
                  </p>
                ))
              }
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
          <Button variant="primary" onClick={sendMessage}>GỬI</Button>
        </InputGroup>
      </div>
    </div>
  );
};

export default Chatbox;