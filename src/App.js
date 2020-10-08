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
          <Header className="fix head"></Header>
          
        

          {/* contextProvider */}
          <StoreContext>
            <ProductContext>
            <Switch>
              <Route exact path="/hem" component={GrocerySearchPage} />
              <Route path="/inkopslista" component={ProductListPage}/>
            </Switch>
            </ProductContext>
          </StoreContext>
        </div>
          
          {/* contextProvider */}
        
      </Router>
    </>
  );
}

export default App;
