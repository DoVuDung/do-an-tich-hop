import axios from 'axios';
import React, { useState } from 'react';

//import img
import chatbotImg from '../../../assets/images/icon-chatbot.png';
import ModalChatbot from '../UI/Modal/ModalChatbot';

import styles from './Chatbot.module.scss';

const CHATBOT_URL = 'http://127.0.0.1:5000/chatbot';

const demoChat = [
  {
    id: 1,
    name: 'chatbot',
    content: 'Hi, How can I help you?',
  },
];

export default function Chatbot(props) {
  const [showChatWindow, setShowChatWindow] = useState(false);
  const [showUnreadIcon, setShowUnreadIcon] = useState(true);
  // eslint-disable-next-line
  const [isSending, setIsSending] = useState(false);

  const [chatMessages, setChatMessages] = useState(demoChat);
  const [messageInput, setMessageInput] = useState();

  //show chat window handlers
  const handleToggleChatWindow = () => {
    setShowChatWindow((prev) => !prev);
    setShowUnreadIcon(false);
  };
  // const handleShowChatWindow = () => {
  //   setShowChatWindow(true);
  // };
  const handleHideChatWindow = () => {
    setShowChatWindow(false);
  };

  const handleMessageInputChange = (e) => {
    setMessageInput(e.target.value);
  };

  //message handlers
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageInput) return;

    const updatedData = chatMessages;

    updatedData.push({
      id: Math.random(),
      name: 'user',
      content: messageInput,
    });

    setChatMessages(updatedData);

    setIsSending(true);
    setMessageInput('');

    try {
      const response = await axios.post(CHATBOT_URL, {
        msg: messageInput,
      });

      const updatedData = chatMessages;

      const chatbotMsg = response.data.msg;

      //get tag(link) answer. ex: Ok, here [html] => [html];
      const tag = chatbotMsg.split(' ').reverse()[0];

      let type, content, answer;

      //check type and content
      if (tag[0] === '[') {
        type = 'topic';
        content = tag.split('').slice(1, -1).join(''); //[topic] => topic

        answer = (
          <>
            <p>{chatbotMsg.split(' ').slice(0, -1).join(' ')}</p>
            {content && type && (
              <a href={`/search/${type}/${content}`}>{content}</a>
            )}
          </>
        );
      } else if (tag[0] === '{') {
        type = 'category';
        content = tag.split('').slice(1, -1).join(''); //{category} => category

        answer = (
          <>
            <p>{chatbotMsg.split(' ').slice(0, -1).join(' ')}</p>
            {content && type && (
              <a href={`/search/${type}/${content}`}>{content}</a>
            )}
          </>
        );
      } else if (tag[0] !== '{' || tag[0] !== '[') {
        answer = <p>{chatbotMsg}</p>;
      }

      //push new message to chat window
      updatedData.push({
        id: Math.random(),
        name: 'chatbot',
        content: answer,
      });

      setChatMessages(updatedData);
    } catch (error) {
      console.log(error);
    }

    setIsSending(false);

    setChatMessages(updatedData);
  };

  return (
    <div className={styles.container}>
      {/* chatbot icon */}
      <img
        className={styles['chatbot-icon']}
        src={chatbotImg}
        alt="Chatbot"
        onClick={handleToggleChatWindow}
      />
      {/* unread icon */}
      {showUnreadIcon && (
        <div className={styles.unreadIcon}>
          <p>1</p>
        </div>
      )}
      {/* chat window */}
      <ModalChatbot
        className={styles['chat-window']}
        show={showChatWindow}
        items={chatMessages}
        onCloseClick={handleHideChatWindow}
        onMessageInputChange={handleMessageInputChange}
        onSendClick={handleSendMessage}
        message={messageInput}
      />
    </div>
  );
}
