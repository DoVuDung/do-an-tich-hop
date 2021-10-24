import React from 'react';
import { IoIosSend, IoMdClose } from 'react-icons/io';
import Button1 from '../Button/Button1';
import Card1 from '../Card/Card1';
import AlwaysScrollToBottom from '../Helper/AlwaysScrollToBottom';

import styles from './ModalChatbot.module.scss';

export default function ModalChatbot({
  className,
  show = true,

  items = [],
  message,
  showTyping,

  onCloseClick,
  onMessageInputChange,
  onSendClick,
  ...props
}) {
  return (
    <>
      {show && (
        <Card1 className={`${styles.container} ${className}`}>
          {/* header */}
          <div className={styles.header}>
            <p>Guru Academy Chatbot</p>
            <IoMdClose size={20} onClick={onCloseClick} />
          </div>
          {/* content */}
          <div className={styles.content}>
            <ul>
              {items.map((msgData) => (
                <li
                  key={msgData.id}
                  className={
                    msgData.name === 'chatbot'
                      ? styles['chatbot-message']
                      : styles['user-message']
                  }
                >
                  <div className={styles['content-message']}>
                    {msgData.content}
                  </div>
                </li>
              ))}
              {showTyping && (
                <li className={styles['chatbot-message']}>
                  <div className={styles['content-message']}>...</div>
                </li>
              )}
              <AlwaysScrollToBottom />
            </ul>
          </div>
          {/* footer */}
          <form className={styles.footer} onSubmit={onSendClick}>
            <input value={message} onChange={onMessageInputChange} />
            <Button1 className={styles['send-btn']} type="submit">
              <IoIosSend size={20} />
            </Button1>
          </form>
        </Card1>
      )}
    </>
  );
}
