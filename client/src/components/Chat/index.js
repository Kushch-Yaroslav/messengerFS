import React, { useEffect, useRef, useState } from "react";
import styles from "./Chat.module.css";
import { connect } from "react-redux";
import cx from "classnames";
import ScrollDown from "./scrollToBottomBtn";
import FormExample from "../Navbar";

const Chat = ({ currentChat, user }) => {
  const chatContainerRef = useRef(null);
  const lastMessageRef = useRef(null);

  //К последнему сообщению
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentChat]);

  const messageMap = (msg, index) => {
    const isLastMessage = index === currentChat.messages.length - 1;
    console.log(`сообщение от сервера ${msg.author}`);
    const cn = cx(styles.message, {
      [styles["user-message"]]: msg.author._id === user._id,
    });

    //Абзацы в сообщении
    const messageWithBreaks = msg.body.split("\n").map((text, index) => (
      <React.Fragment key={index}>
        {text}
        <br />
      </React.Fragment>
    ));

    return (
      <li
        key={msg._id}
        className={cn}
        ref={isLastMessage ? lastMessageRef : null}
      >
        <span className={styles["message-author"]}>{msg.author.firstName}</span>
        <span className={styles["message-body"]}>{messageWithBreaks}</span>
        <span className={styles["message-time"]}>
          {new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </li>
    );
  };

  return (
    <div className={styles["chat-wrapper"]} ref={chatContainerRef}>
      {currentChat && (
        <div className={styles.formUp}>
          <FormExample />
        </div>
      )}

      <ul className={styles.chat}>
        {currentChat &&
          currentChat.messages.map((msg, index) => messageMap(msg, index))}
      </ul>
      <ScrollDown
        chatContainerRef={chatContainerRef}
        lastMessageRef={lastMessageRef}
      />
    </div>
  );
};

const mapStateToProps = ({ user, currentChat }) => ({ user, currentChat });

export default connect(mapStateToProps)(Chat);
