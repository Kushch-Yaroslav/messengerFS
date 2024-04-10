import React, { useState } from "react";
import styles from "./MessageArea.module.css";
import { sendNewMessageAction } from "../../actions/actionCreators";
import { connect } from "react-redux";
import { socket } from "../../api/socket";
const MessageArea = (props) => {
  const [message, setMessage] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const trimMessage = message.trim();
    if (!trimMessage) {
      return;
    }
    props.sendMessage({ body: message, chatId: props.currentChat._id });
    // socket.emit("NEW_MESSAGE", {
    //   body: trimMessage,
    //   chatId: props.currentChat._id,
    // });
    setMessage(" ");
  };

  const changeHandler = ({ target: { value } }) => {
    setMessage(value);
  };

  const handlerKey = (event) => {
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
          onKeyDown={handlerKey}
        />
        <button className={styles["send-btn"]}>&#10148;</button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ currentChat }) => ({ currentChat });

const mapDispatchToProps = {
  sendMessage: sendNewMessageAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageArea);
