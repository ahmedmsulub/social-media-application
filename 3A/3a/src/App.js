import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeContext } from './components/themeContext/ThemeContext';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import Main from './components/main/Main';
import LoginComponent from './components/login/LoginComponent';
import RegisterUser from './components/registerUser/RegisterUser';
import Settings from './components/settings/Settings';
import Contacts from '../src/components/Contacts/Contacts';
import Message from './components/ChatAppliaction/Chat'
import image1 from './media/oceandawn.jpg';
import BackgroundComponent from './components/background/BackgroundComponent';


const App = () => {
  const [user, setUser] = useState(false);
  const [profilePicture, setProfilePicture] = useState(localStorage.profilePicture);
  const [theme, setTheme] = useState('rgba(0,0,0,0.8)');
  const [mainTheme, setMainTheme] = useState('rgba(0,0,0,0.6)');
  const [background, setBackground] = useState(image1)
  const [color, setColor] = useState('white');
  const [fontSize, setFontSize] = useState('medium');


  const store = {
    user: { get: user, set: setUser },
    profilePicture: { get: profilePicture, set: setProfilePicture },
    theme: { get: theme, set: setTheme },
    mainTheme: { get: mainTheme, set: setMainTheme },
    background: { get: background, set: setBackground },
    color: { get: color, set: setColor },
    fontSize: { get: fontSize, set: setFontSize }
  };

  return (
    <ThemeContext.Provider value={store}>
      {<img src={store.background.get} alt="ocean at dawn" />}
      <div className="container">
        <Router>
          {user ? <> <Navbar />
            <Sidebar>
              <Contacts />
            </Sidebar> </> : null}
          <Switch>
            {!user ?
              <>
                <Route path="/" exact render={props => <LoginComponent {...props} />} />
                <Route path="/login" render={props => <LoginComponent {...props} />} />
                <Route path="/register" render={props => <RegisterUser {...props} />} />
              </> :
              <Main>
                <Route path="/background" render={props => <BackgroundComponent {...props} />} />
                <Route path="/settings" render={props => <Settings {...props} />} />
                <Route path="/settings/background" render={props => <BackgroundComponent></BackgroundComponent>} />
                <Route path="/message" render={props => <Message {...props} />} />
              </Main>
            }

          </Switch>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
