export const handleEditMessage = (
  setEditableMessage,
  messageId,
  messageContent
) => {
  setEditableMessage({ messageId, text: messageContent });
};
