import React from "react";
import styles from "./ContextMenu.module.css";
const ContextMenu = ({ x, y, onDelete }) => {
  const menuStyle = {
    position: `absolute`,
    "z-index": "999",
    top: `${y}px`,
    left: `${x}px`,
  };
  return (
    <div style={menuStyle} className={styles.contexMenu}>
      <ul className={styles.menu}>
        <li className={styles["menuItem copy"]}>копировать</li>
        <li className={styles["menuItem del"]} onClick={onDelete}>
          удалить
        </li>
      </ul>
    </div>
  );
};

export default ContextMenu;

//ОСТАНОВИЛСЯ НА ОПТИМИЗАЦИИ CONTEX MENU
