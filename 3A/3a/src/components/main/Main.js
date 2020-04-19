import React, { useContext } from 'react';
import styles from './main.module.css'
import { ThemeContext } from '../themeContext/ThemeContext';

const Main = (props) => {
    const store = useContext(ThemeContext)
    
    return (
        <div className={styles.main} style={{background: store.mainTheme.get}}>
            {props.children}
        </div>
    );
}

export default Main;