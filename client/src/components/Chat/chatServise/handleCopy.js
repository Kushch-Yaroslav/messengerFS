export const handleCopy = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log(`Текст скопирован ${text}`);
    })
    .catch((err) => {
      console.error("Ошибка при копировании текста: ", err);
    });
};
