import React, { useEffect, useRef, useState } from "react";
import styles from "./Chat.module.css";
import { connect } from "react-redux";
import cx from "classnames";
import ScrollDown from "./scrollToBottomBtn";
import { deleteMessagesAction } from "../../actions/actionCreators";
import ContextMenu from "./contextMenu";
import { handleContextMenu } from "./chatServise/handleContexMenu";
import { handleDelete, handleDeleteSelected } from "./chatServise/handleDelete";

const Chat = ({ currentChat, user, deleteMessage }) => {
  const [contextMenu, setContextMenu] = useState(null);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [selectedText, setSelectedText] = useState("");
  const chatContainerRef = useRef(null);
  const lastMessageRef = useRef(null);

  ///////////////////////////
  const toggleMessageSelection = (messageId) => {
    setSelectedMessages((prevSelected) => {
      return prevSelected.includes(messageId)
        ? prevSelected.filter((id) => id !== messageId)
        : [...prevSelected, messageId];
    });
  };
  const handleTextState = (event) => {
    const copyText = event.target.textContent;
    console.log(`Выбран текст: ${copyText}`);
    setSelectedText(copyText);
  };

  /////////////////////////// Для удаления нескольких
  const handleDeleteSelectedParams = handleDeleteSelected(
    currentChat,
    deleteMessage,
    setSelectedMessages,
    selectedMessages
  );
  /////////////////////////// Для удаления одного
  const handleDeleteParams = handleDelete(
    currentChat,
    deleteMessage,
    contextMenu,
    setContextMenu
  );

  /////////////////////////// Для контекстного меню
  const handleContexMenuParams = handleContextMenu(
    setContextMenu,
    currentChat,
    chatContainerRef,
    toggleMessageSelection
  );

  //К последнему сообщению
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentChat]);

  //Контекст меню
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contextMenu && !event.target.closest(".context-menu")) {
        setContextMenu(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [contextMenu]);

  const messageMap = (msg, index) => {
    // При отрисовке каждого сообщения
    const isMessageSelected = selectedMessages.includes(msg._id);
    const isLastMessage = index === currentChat.messages.length - 1;
    const cn = cx(
      styles.message,
      {
        [styles["user-message"]]: msg.author._id === user._id,
      },
      {
        [styles.selected]: isMessageSelected, // Добавление класса для выбранных сообщений
      }
    );

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
        onContextMenu={handleContexMenuParams}
        data-message-id={msg._id}
      >
        <span className={styles["message-author"]}>{msg.author.firstName}</span>
        <span onClick={handleTextState} className={styles["message-body"]}>
          {messageWithBreaks}
        </span>
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
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onDelete={() => handleDeleteParams(contextMenu)}
          onToggleSelect={contextMenu.onToggleSelect}
          handleDeleteSelectedParams={handleDeleteSelectedParams}
          selectedMessages={selectedMessages}
          selectedText={selectedText}
        />
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
const mapDispatchToProps = {
  deleteMessage: deleteMessagesAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
