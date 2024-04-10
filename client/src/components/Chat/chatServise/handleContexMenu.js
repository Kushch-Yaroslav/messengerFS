export const handleContextMenu = (setContextMenu, currentChat) => (event) => {
  event.preventDefault();
  const messageElement = event.target.closest(`li[data-message-id]`);
  if (messageElement) {
    const messageId = messageElement.getAttribute("data-message-id");
    const message = currentChat.messages.find((msg) => msg._id === messageId);

    if (message) {
      setContextMenu({
        x: event.pageX,
        y: event.pageY,
        messageId: messageId,
      });
    }
  }
};
