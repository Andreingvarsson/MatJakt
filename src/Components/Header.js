import React, { useState } from 'react';
import '../Css/Header.css'
import '../Css/fonts.css'
import { Link } from 'react-router-dom';
import { ProductContext } from '../ContextProviders/ProductContext';


const Header = (props) => {

  //const {productsInList} = useContext(ProductContext)
  

  
  return (
<>   
    

<nav className="navbar navbar-expand-md navbar-light bg-light sticky-top bg-dark">
  <div className="container ">

    <h3 className="monospace-font font-white col-xs-4 col-sm-6 col-md-6 col-l-6 col-xl-6 ">MatJakt</h3>
    {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#links" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button> */}
    <div className="collapse navbar-collapse d-flex justify-content-end col-xs-8 col-sm-6 col-md-6 col-l-6 col-xl-6" id="links">
      <Link className="nav-link btn btn-light monospace-font col-6" to="/hem">Sök varor</Link>
      <Link className="nav-link btn btn-light monospace-font ml-3 col-6" to="/inkopslista">Inköpslista<span></span></Link>
   
    </div>
  </div>
</nav>



</>
  );
}

export default Header;