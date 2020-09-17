import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  //Link
} from "react-router-dom";

function App() {
  return (
    <>
    <Router>  
    <div className="App"> 
    {/* contextProvider */}
    <Switch>
      <Route exact path="/" component={home}/>
    </Switch>
    {/* contextProvider */}
    </div>
    </Router>
    </>
  );
}

export default App;
