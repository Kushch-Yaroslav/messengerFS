import React, { useState, useEffect } from "react";
import styles from "./MessageArea.module.css";
import {
  sendNewMessageAction,
  setEditableMessage,
  clearEditableMessage,
  updateMessageAction,
} from "../../actions/actionCreators";
import { connect } from "react-redux";
const MessageArea = ({
  currentChat,
  editableMessage,
  sendMessage,
  setEditableMessage,
  clearEditableMessage,
  updateMessage,
}) => {
  const [message, setMessage] = useState("");
  const [currentEditingMessageId, setCurrentEditingMessageId] = useState(null);

  useEffect(() => {
    if (editableMessage && editableMessage.messageId) {
      setMessage(editableMessage.text);
      setCurrentEditingMessageId(editableMessage.messageId);
    } else {
      setCurrentEditingMessageId(null); // Убедитесь, что здесь правильно очищается ID
    }
  }, [editableMessage]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    if (currentEditingMessageId) {
      console.log(`Sending update for message ID: ${currentEditingMessageId}`);
      updateMessage(currentEditingMessageId, { body: trimmedMessage });
      setCurrentEditingMessageId(null); // Очистка ID после обновления
    } else {
      sendMessage({ body: trimmedMessage, chatId: currentChat._id });
    }

    setMessage(""); // Очистка поля ввода
    clearEditableMessage();
  };
  const changeHandler = (event) => {
    setMessage(event.target.value);
  };

  const onKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSubmitHandler(event);
    } else if (event.key === "Enter" && event.shiftKey) {
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmitHandler} className={styles.form}>
        <textarea
          name="message"
          value={message}
          placeholder="Введите сообщение..."
          onChange={changeHandler}
          className={styles.text}
          onKeyDown={onKeyDown}
        />
        <button className={styles["send-btn"]}>&#10148;</button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ currentChat, editableMessage }) => ({
  currentChat,
  editableMessage,
});

const mapDispatchToProps = {
  sendMessage: sendNewMessageAction,
  setEditableMessage: setEditableMessage,
  clearEditableMessage: clearEditableMessage,
  updateMessage: updateMessageAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageArea);
