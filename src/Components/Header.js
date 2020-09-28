import React,{useContext, useEffect, useState} from 'react';
import '../Css/Header.css'
import '../Css/fonts.css'
import { Link } from 'react-router-dom';
import { ProductContext } from '../ContextProviders/ProductContext';


const Header = (props) => {

  //const {productsInList} = useContext(ProductContext)
  

  
  return (
<>   
<div className="header bg-dark fix"> 
<div className="container ">
    <nav className="navbar d-flex justify-content-end">   
      <span className="navbar-brand col-4">
        <h1 className="monospace-font" href="/">MatJakt!</h1>
      </span>
      <div className="col-4 d-flex justify-content-between">
        
          <Link className="nav-link btn btn-light monospace-font" to="/sok-varor">Sök varor</Link>
          <Link className="nav-link btn btn-light monospace-font" to="/inkopslista">Inköpslista<span></span></Link>
        
      </div>
    </nav>  
    </div>
</div>

</>
  );
}

export default Header;