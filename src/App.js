import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Navbar from "./component/Navbar.js"
import HomePage from "./component/pages/HomePage.js";
function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>
      <Switch>
      <Route exact path="/" component={HomePage} />
      </Switch>
      </Router>
    </div>
  );
}

export default App;
