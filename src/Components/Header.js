import React, { useState } from 'react';
import '../Css/Header.css'
import '../Css/fonts.css'
import { Link } from 'react-router-dom';
import { ProductContext } from '../ContextProviders/ProductContext';


const Header = (props) => {

  //const {productsInList} = useContext(ProductContext)
  

  
  return (
<>   


<nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top bg-dark">
  <div className="container">

    <h1 className="monospace-font font-white ">MatJakt</h1>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <Link className="nav-link btn btn-light monospace-font" to="/sok-varor">Sök varor</Link>
      <Link className="nav-link btn btn-light monospace-font" to="/inkopslista">Inköpslista<span></span></Link>
   
    </div>
  </div>
</nav>



</>
  );
}

export default Header;