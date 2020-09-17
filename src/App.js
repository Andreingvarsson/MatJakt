import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  //Switch,
  //Route,
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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          <button onClick={getData}>
            click me
          </button>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    <h1>Hejsan Kewla dudes</h1>
    </div>
    </Router>
    </>
  );
}

export default App;
