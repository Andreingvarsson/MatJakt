import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  //Link
} from "react-router-dom";

const getData = async () => {

  let data = await fetch('/api/sort')

  data = await data.json()

  console.log(data)

}

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
