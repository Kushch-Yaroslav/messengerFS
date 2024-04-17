import React, { useEffect, useRef, useState } from "react";
import styles from "./Chat.module.css";
import { connect } from "react-redux";
import cx from "classnames";
import ScrollDown from "./scrollToBottomBtn";
import {
  deleteMessagesAction,
  updateMessageAction,
  setEditableMessage,
} from "../../actions/actionCreators";
import ContextMenu from "./contextMenu";
import { handleContextMenu } from "./chatServise/handleContexMenu";
import { handleDelete, handleDeleteSelected } from "./chatServise/handleDelete";
import { formatTimeMessage } from "./chatServise/formatTimeMessage";
import { handleEditMessage } from "./chatServise/handleUpdate";

const Chat = ({
  currentChat,
  user,
  deleteMessage,
  setEditableMessage,
  ...props
}) => {
  const [contextMenu, setContextMenu] = useState(null);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [selectedText, setSelectedText] = useState("");
  const chatContainerRef = useRef(null);
  const lastMessageRef = useRef(null);
  const onEditMessage = (messageId, messageContent) => {
    console.log(
      `Редактирование сообщения с ID: ${messageId}, текст: ${messageContent}`
    );
    // setEditableMessage({ messageId: messageId, text: messageContent });
    handleEditMessage(setEditableMessage, messageId, messageContent);
  };

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
    deleteMessage,
    currentChat,
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
    const cn = cx(styles.message, {
      [styles.userMessage]: msg.author._id === user._id,
      [styles.selected]: isMessageSelected, // Добавление класса для выбранных сообщений
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
        onContextMenu={handleContexMenuParams}
        data-message-id={msg._id}
      >
        <div className={styles.messageContent}>
          <span className={styles.messageAuthor}>{msg.author.firstName}</span>
          <span onClick={handleTextState} className={styles.messageBody}>
            {messageWithBreaks}
          </span>
          <span className={styles.messageTime}>
            {formatTimeMessage(msg.createdAt)}
          </span>
        </div>
      </li>
    );
  };

  return (
    <div className={styles.chatWrapper} ref={chatContainerRef}>
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onEdit={onEditMessage}
          onDelete={() => handleDeleteParams(contextMenu)}
          onToggleSelect={contextMenu.onToggleSelect}
          handleDeleteSelectedParams={handleDeleteSelectedParams}
          selectedMessages={selectedMessages}
          selectedText={selectedText}
          messageId={contextMenu.messageId}
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
  setEditableMessage: setEditableMessage,
  deleteMessage: deleteMessagesAction,
  updateMessage: updateMessageAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(Chat);

///Необходимо оптимизировать компоненты
