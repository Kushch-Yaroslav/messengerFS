// Удаление одного сообщения
export const handleDelete = (deleteMessage, currentChat, setContextMenu) => {
  return (contextMenu) => {
    if (contextMenu && contextMenu.messageId) {
      deleteMessage({
        chatId: currentChat._id,
        messageIds: [contextMenu.messageId],
      });
      setContextMenu(null);
    }
  };
};

// Удаление нескольких сообщений
export const handleDeleteSelected = (
  currentChat,
  deleteMessage,
  setSelectedMessages,
  selectedMessages
) => {
  return () => {
    console.log("Before delete", { selectedMessages });
    deleteMessage({
      chatId: currentChat._id,
      messageIds: selectedMessages,
    });
    console.log("After delete", { selectedMessages });
    setSelectedMessages([]); // Очистка выбора после удаления
  };
};
