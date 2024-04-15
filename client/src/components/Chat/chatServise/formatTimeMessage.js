export const formatTimeMessage = (createdAt) => {
  const messageDate = new Date(createdAt);
  const now = new Date();
  const yesterday = new Date(now - 24 * 60 * 60 * 1000);

  const messageDay = messageDate.toDateString();
  const today = now.toDateString();
  const yesterdayDay = yesterday.toDateString();

  const timeString = messageDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (messageDay === today) {
    return timeString;
  } else if (messageDay === yesterdayDay) {
    return `Вчера, ${timeString}`;
  } else {
    const dateString = messageDate.toLocaleDateString();
    return `${dateString}, ${timeString}`;
  }
};
