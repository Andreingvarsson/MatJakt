import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import AllProducts from "./component/Pages/AllProducts"
import Navbar from "./component/views/Navbar"
import HomePage from "./component/Pages/HomePage";


function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
      <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/ALLP" component={AllProducts} />
      </Switch>
      </Router>
    </div>
  );
}

export default App;
