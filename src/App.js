
import './App.css';
import About from './components/About';
import Fruits from './components/Fruits';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Vegetables from './components/Vegetables';
import Home from './components/Home';
import Login from './components/Login';
import Alert from './components/Alert';
import { useState } from 'react';
import Signup from './components/Signup';
import Cartstate from './context/Cartstate';
import ButtonCart from './components/ButtonCart';
import UserAccount from './components/UserAccount';

function App() {
  const [alert, setalert] = useState(null);
  const showalert = (message, type) => {
    setalert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setalert(null);
    }, 2000);
  }

  return (
    <>
      <Cartstate>
        <Router>
          <Navbar />
          <div className="container-app">
            <Alert alert={alert} />
            <Switch>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/fruits">
                <Fruits />
              </Route>
              <Route exact path="/vegetables">
                <Vegetables />
              </Route>
              <Route exact path="/">
                <Home showalert={showalert}/>
              </Route>
              <Route exact path="/login">
                <Login showalert={showalert} />
              </Route>
              <Route exact path="/signup">
                <Signup showalert={showalert}/>
              </Route>
              <Route exact path="/useraccount">
                <UserAccount/>
              </Route>
              <Route exact path="/buttoncart">
                <ButtonCart showalert={showalert}/>
              </Route>
            </Switch>
          </div>
        </Router>
      </Cartstate>
    </>
  );
}

export default App;
