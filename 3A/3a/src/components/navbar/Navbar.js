import React, { useContext } from 'react';
import { ThemeContext } from '../themeContext/ThemeContext';
import { Link } from 'react-router-dom';
import logo from '../../../src/media/logo512.png';
import styles from './navbar.module.css';



const Navbar = (props) => {
    const store = useContext(ThemeContext);

    const logoutFunc = () => {
        store.user.set(false)
    }


    return (
        <div className={styles.navbar} style={{ background: store.theme.get, color: store.color.get }}>
            <nav>
                <div><nav role="navigation">
                    <div id="menuToggle">
                        <input type="checkbox" />
                        <span></span>
                        <span></span>
                        <span></span>
                        {<ul id="menu">
                            <li>
                                <Link to="/settings">Setting</Link>
                            </li>
                            <li>
                                <Link onClick={logoutFunc} to="/login" style={{ color: store.color.get }}>Logout</Link>
                            </li>
                        </ul>}
                    </div>
                </nav></div>
                <div>
                    <img src={logo} className={styles.logo} />
                </div>
                <ul>
                    <li>
                        <Link to="/settings" style={{ color: store.color.get }}>Setting</Link>
                    </li>
                    <li>
                        <Link onClick={logoutFunc} to="/login" className={styles.logout}>Logout</Link>
                    </li>
                </ul>
            </nav>
            <div>
                <img src={localStorage.profilePicture} width="70px" height="70px" className={styles.profilePicture} />
            </div>
        </div>
    );
}

export default Navbar;