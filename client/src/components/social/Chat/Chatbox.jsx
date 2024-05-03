import React, { useContext, useEffect, useState } from 'react';
import { FormControl, Button, InputGroup, Card } from 'react-bootstrap';
import { UserContext } from '../../../App';
import { authApi, endpoints } from '../../../configs/ApiConfig';
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import { db } from '../../../configs/Firebase';
import { Link, useParams } from 'react-router-dom';
import './Chatbox.css'; // Import file CSS

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messageRef = collection(db, "messages");
  const userRef = collection(db, "users");
  const [targetUser, setTargetUser] = useState(null)
  const [user] = useContext(UserContext);
  const [senderData, setSenderData] = useState({});

  const sendMessage = async (evt) => {
    evt.preventDefault();
    if (newMessage.trim() === "") {
      return;
    }

    try {
      let res = await authApi().post(endpoints["chat"](user.id), {
        content: newMessage,
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

      const unsubscribe = onSnapshot(queryMessages, async (snapshot) => {
        const promises = snapshot.docs.map(async (doc) => {
          const messageData = doc.data();
          const userRef = messageData.user;
          const userDoc = await getDoc(userRef);
          const userData = userDoc.data();
          const displayName = userData?.displayName;
          const photoUrl = userData?.photoUrl;
          const userId = userData?.id;
          return {...messageData, id: doc.id, userId, displayName, photoUrl };
        });

        const messages = await Promise.all(promises);
        const senderData = {}; // Tạo đối tượng senderData mới

        // Lặp qua messages để cập nhật senderData
        messages.forEach((message) => {
          senderData[message.id] = { userId: message.userId, displayName: message.displayName, photoUrl: message.photoUrl };
        });
        console.log("MESSAGES: " + messages);
        console.log("SEND DATA: " + senderData);
        // Cập nhật trạng thái messages và senderData
        setMessages(messages);
        setSenderData(senderData);
      });

      return () => unsubscribe();
    };

    fetchMessage();
  }, []);

  useEffect(() => {
    const messageBox = document.querySelector(".message-box");
    if (messageBox) {
      messageBox.scrollTop = messageBox.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chatbox-container mt-3">
      <div className="chatbox-messages">
        <Card>
          <Card.Body>
            <Card.Title>NONPROFIT SOCIAL NETWORK CHATGROUP</Card.Title>
            <hr />
            <div className="message-box">
              {messages?.map((message, i) => (
                <div key={i} className={`message ${senderData[message.id]?.userId === (user? user.id : null)? 'message-right' : 'message-left'}`}>
                  {/* Check if the message is not sent by the current user */}
                  {senderData[message.id]?.userId!== (user? user.id : null) && (
                    <img src={senderData[message.id]?.photoUrl || "/avatar.png"} alt="Avatar" className="avatar" />
                  )}
                  <div className="message-content">{message.content}</div>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      </div>
      <div className="chatbox-input mt-2">
        {!user? (
          <Link to="/login">Đăng nhập để chat</Link>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default Chatbox;