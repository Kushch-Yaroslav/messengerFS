import React, { useEffect, useState } from "react";
import styles from "./Chat.module.css"; // Убедитесь, что у вас есть соответствующий CSS-файл

const ScrollDown = ({ chatContainerRef, lastMessageRef }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleVisibility = () => setIsVisible(true); // Функция для показа кнопки
    if (isVisible) {
      // Задержка для плавного появления кнопки
      const timeoutId = setTimeout(handleVisibility, 200);
      return () => clearTimeout(timeoutId);
    }
  }, [isVisible]);

  const scrollToBottom = () => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    setIsVisible(false);
  };

  const checkVisibility = () => {
    if (!chatContainerRef.current || !lastMessageRef.current) return;

    const chatRect = chatContainerRef.current.getBoundingClientRect();
    const lastMessageRect = lastMessageRef.current.getBoundingClientRect();

    setIsVisible(lastMessageRect.bottom > chatRect.bottom);
  };

  useEffect(() => {
    const chatDiv = chatContainerRef.current;
    if (chatDiv) {
      chatDiv.addEventListener("scroll", checkVisibility);

      // Вызываем checkVisibility сразу после монтирования, чтобы определить, должна ли кнопка быть видимой
      checkVisibility();

      return () => {
        chatDiv.removeEventListener("scroll", checkVisibility);
      };
    }
  }, [chatContainerRef, lastMessageRef]);
  const buttonClasses = `${styles.scrollDown} ${
    isVisible ? styles.visible : ""
  }`;

  return isVisible ? (
    <button className={buttonClasses} onClick={scrollToBottom}></button>
  ) : null;
};

export default ScrollDown;
