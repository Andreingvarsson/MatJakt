import React from "react";
import "./Css/App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import home from "./Pages/Home";
import StoreContext from "./ContextProviders/StoreContext";
import ProductContext from "./ContextProviders/ProductContext";
import Header from "./Components/Header";
import GrocerySearchPage from "./Pages/GrocerySearchPage";
import ProductListPage from "./Pages/ProductListPage";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Header></Header>
          {/* contextProvider */}
          <StoreContext>
            <ProductContext>
            <Switch>
              <Route exact path="/" component={home} />
              <Route path="/sok-varor" component={GrocerySearchPage} />
              <Route path="/inkopslista" component={ProductListPage}/>
            </Switch>
            </ProductContext>
          </StoreContext>
          {/* contextProvider */}
        </div>
      </Router>
    </>
  );
}

export default App;
