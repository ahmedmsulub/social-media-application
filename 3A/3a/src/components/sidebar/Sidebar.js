import React, { useContext } from 'react';
import styles from './sidebar.module.css'
import { ThemeContext } from '../themeContext/ThemeContext';

const Sidebar = (props) => {
    const store = useContext(ThemeContext)

    return (
        <div className={styles.sidebar} style={{ background: store.theme.get }}>
            {props.children}
        </div>
    );
}

export default Sidebar;