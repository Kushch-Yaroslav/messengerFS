export const handleContextMenu =
  (setContextMenu, currentChat, chatContainerRef, toggleMessageSelection) =>
  (event) => {
    event.preventDefault();
    const messageElement = event.target.closest(`li[data-message-id]`);

    if (messageElement) {
      const messageId = messageElement.getAttribute("data-message-id");
      const message = currentChat.messages.find((msg) => msg._id === messageId);
      const chatBox = chatContainerRef.current.getBoundingClientRect();
      const leftOffset = chatBox.left + window.scrollX;
      if (message) {
        setContextMenu({
          x: event.pageX - leftOffset,
          y: event.pageY,
          messageId: messageId,
          onToggleSelect: () => toggleMessageSelection(messageId),
        });
      }
    }
  };
