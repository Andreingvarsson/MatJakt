import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const getData = async (input) => {

  let data = await fetch('/api/products/' + input)

  data = await data.json()

  console.log(data)

}

function App() {
  return (
    <>
    <Router>
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          <button onClick={getData(1)}>
            category1
          </button>
          <button onClick={getData(4)}>
            category4
          </button>
          <button onClick={getData(10)}>
            category10
          </button>
          <button onClick={getData(15)}>
            category15
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
