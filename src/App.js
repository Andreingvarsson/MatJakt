import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./component/views/Navbar"
import HomePage from "./component/Pages/HomePage";


function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
      <Switch>
      <Route exact path="/" component={HomePage} />
      </Switch>
      </Router>
    </div>
  );
}

export default App;
