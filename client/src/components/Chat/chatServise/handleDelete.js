export const handleDelete = (
  deleteMessage,
  currentChat,
  contextMenu,
  setContextMenu
) => {
  return (contextMenu) => {
    console.log(`Deleting messageId: ${contextMenu?.messageId}`);
    if (contextMenu && contextMenu.messageId) {
      deleteMessage({
        chatId: currentChat._id,
        messageIds: [contextMenu.messageId],
      });
      setContextMenu(null);
    }
  };
};
