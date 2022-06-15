import React from "react";
import styles from "./Header.module.css";

const Header = () => {
    return (
        <div className={styles.Header}>
            <a href="http://localhost:3000/">Wordles With Friends</a>
        </div>
    );
};

export default Header;
