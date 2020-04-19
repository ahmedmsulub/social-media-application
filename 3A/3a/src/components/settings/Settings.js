import React, { useContext } from 'react';
import { ThemeContext } from '../themeContext/ThemeContext';
import Wrapper from '../wrapper/Wrapper';
import InputColor from 'react-input-color';
import styles from './settings.module.css';
import { Link } from 'react-router-dom'


const Settings = () => {
  const store = useContext(ThemeContext);
  const [color, setColor] = React.useState({});
  // console.log(store)

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }

  const imageUpload = (e) => {
    const file = e.target.files[0];
    getBase64(file).then(base64 => {
      localStorage["profilePicture"] = base64
      store.profilePicture.set({ profilePicture: localStorage.profilePicture })
    });
  };

  const handleTheme = () => {
    store.theme.set(color.rgba);
  }

  const handleSmallFont = (e) => {
    e.preventDefault()
    store.fontSize.set('small')
  }

  const handleMediumFont = (e) => {
    e.preventDefault()
    store.fontSize.set('medium')
  }

  const handleBigFont = (e) => {
    e.preventDefault()
    store.fontSize.set('larger')
  }

  return (
    <Wrapper>
      <div className={styles.settings} style={{ color: store.color.get, fontSize: store.fontSize.get }}>
        <div className={styles.pictureFrame}>
          <h3 style={{ textAlign: 'center' }}>Change profile picture</h3>
          <br />
          <img src={localStorage.profilePicture} ></img><br />
          <input
            type="file"
            id="profilePicture"
            name='profilePicture'
            onChange={imageUpload} />
        </div>
        <div className={styles.colorFrame}>
          <h3>Change theme color</h3>
          <InputColor
            initialValue="#5e72e4CC"
            onChange={setColor}
            placement="top"
          />
          <button onClick={handleTheme}>Change Theme</button>
        </div>
        <div className={styles.fontFrame}>
          <h3>Change Fontsize</h3>
          <div>
            <button className={styles.smallButton} onClick={handleSmallFont}>Small</button>
            <button className={styles.mediumButton} onClick={handleMediumFont}>Medium</button>
            <button className={styles.largeButton} onClick={handleBigFont}>Large</button>
          </div>
        </div>
        <button> <Link to="settings/background" style={{ color: store.color.get }}>Background images</Link></button>
      </div>
    </Wrapper>
  );

}


export default Settings;