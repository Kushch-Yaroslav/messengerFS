import React, { useEffect, useState } from "react";
import styles from "./ContextMenu.module.css";
import { handleCopy } from "./chatServise/handleCopy";
const ContextMenu = ({
  x,
  y,
  onDelete,
  onToggleSelect,
  handleDeleteSelectedParams,
  selectedMessages,
  selectedText,
}) => {
  const menuStyle = {
    position: `absolute`,
    "z-index": "999",
    top: `${y - window.scrollY}px`,
    left: `${x - window.scrollX}px`,
  };
  const [menuVisible, setMenuVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setMenuVisible(true), 0);
  }, []);

  return (
    <div
      style={menuStyle}
      className={`${styles.contextMenu} ${
        menuVisible ? styles.contextMenuEntered : styles.contextMenuEntering
      }`}
    >
      <ul className={styles.menu}>
        <li
          className={`${styles.menuItem} ${styles.selected}`}
          onClick={onToggleSelect}
        >
          Выбрать
        </li>
        <li
          className={`${styles.menuItem} ${styles.copy}`}
          onClick={() => handleCopy(selectedText)}
        >
          Копировать
        </li>
        <li className={`${styles.menuItem} ${styles.del}`} onClick={onDelete}>
          Удалить
        </li>
        {selectedMessages && selectedMessages.length > 0 && (
          <li
            className={`${styles.menuItem} ${styles.delAny}`}
            onClick={handleDeleteSelectedParams}
          >
            Удалить выбранные
          </li>
        )}
      </ul>
    </div>
  );
};

export default ContextMenu;

//ОСТАНОВИЛСЯ НА ОПТИМИЗАЦИИ CONTEX MENU
