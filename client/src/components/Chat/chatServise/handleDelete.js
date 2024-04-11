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
    deleteMessage({
      chatId: currentChat._id,
      messageIds: selectedMessages,
    });
    setSelectedMessages([]); // Очистка выбора после удаления
  };
};
