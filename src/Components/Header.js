import React from 'react';
import '../Css/Header.css'
import ProductListPage from '../Pages/ProductListPage';
import '../Css/fonts.css'


const Header = (props) => {
  const {history} = props
  
  return (
<>   
<div className="header bg-dark"> 
<div className="container ">
    <nav className="navbar d-flex justify-content-end">   
      <span className="navbar-brand col-4">
        <h1 className="monospace-font" href="/">MatJakt!</h1>
      </span>
      <div className="col-4 d-flex justify-content-between">
        
          <a className="nav-link btn btn-light monospace-font" href="/sok-varor">Sök varor</a>
          <a className="nav-link btn btn-light monospace-font" href="/inkopslista">Inköpslista</a>
        
      </div>
    </nav>  
    </div>
</div>

</>
  );
}

export default Header;