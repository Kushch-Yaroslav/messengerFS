// ChatServiceContext.js
import React, { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [currentChat, setCurrentChat] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);

  const deleteMessage = (payload) => {
    // Эмуляция запроса к API для удаления сообщения
    console.log("Deleting message:", payload);
  };

  const handleDelete = (contextMenu) => {
    if (contextMenu && contextMenu.messageId) {
      deleteMessage({
        chatId: currentChat._id,
        messageIds: [contextMenu.messageId],
      });
      setContextMenu(null);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        currentChat,
        setCurrentChat,
        contextMenu,
        setContextMenu,
        handleDelete,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
