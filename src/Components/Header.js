import React from 'react';
import '../Css/Header.css'
import '../Css/fonts.css'
import { Link } from 'react-router-dom';

const Header = (props) => {

  
  return (
<>   
<nav className="navbar navbar-expand-md navbar-light bg-light sticky-top bg-dark">
  <div className="container ">
    <h3 className="monospace-font font-white col-xs-4 col-sm-6 col-md-6 col-l-6 col-xl-6 ">MatJakt</h3>
    <div className="collapse navbar-collapse d-flex justify-content-end col-xs-8 col-sm-6 col-md-6 col-l-6 col-xl-6" id="links">
      <Link className="nav-link btn btn-light monospace-font col-6" to="/">Sök varor</Link>
      <Link className="nav-link btn btn-light monospace-font ml-3 col-6" to="/inkopslista">Inköpslista<span></span></Link>
    </div>
  </div>
</nav>
</>
  );
}

export default Header;