import React, { useEffect, useState } from "react";
import styles from "./DialogList.module.css";
import { connect } from "react-redux";
import {
  getUserChatsAction,
  getChatWithMessagesAction,
} from "../../actions/actionCreators";
import cx from "classnames";
import FormExample from "../Navbar";
import history from "../../browserHistory";
const DialogList = (props) => {
  const { currentChat, chatList, needAuthentication } = props;

  useEffect(() => {
    props.getUserChats();
  }, []);

  useEffect(() => {
    if (needAuthentication) {
      // Перенаправление пользователя на страницу входа. Дополнительный переход для "вернуться назад"
      history.push("/");
    }
  }, [needAuthentication]);

  const changeCurrentChat = (userChoice) => {
    if (userChoice !== currentChat?._id) {
      console.log("user change chat");
      props.getCurrentChat(userChoice);
    }
  };

  const mapList = (chat) => {
    const cn = cx(styles.dialog, {
      [styles.active]: chat._id === currentChat?._id,
    });
    return (
      <li
        key={chat._id}
        className={cn}
        onClick={() => {
          changeCurrentChat(chat._id);
        }}
      >
        {chat.name}
      </li>
    );
  };

  return (
    <div className={styles["dialog-list"]}>
      <FormExample />
      <ul>{chatList && chatList.map(mapList)}</ul>
    </div>
  );
};

const mapStateToProps = ({ chatList, currentChat, needAuthentication }) => ({
  chatList,
  currentChat,
  needAuthentication,
});

const mapDispatchToProps = {
  getUserChats: getUserChatsAction,
  getCurrentChat: getChatWithMessagesAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogList);
