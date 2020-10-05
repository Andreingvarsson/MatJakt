import React, { useContext, useState, useEffect }  from 'react';
import { StoreContext } from '../ContextProviders/StoreContext';
import { ProductContext } from '../ContextProviders/ProductContext';
import SearchComponent from  '../Components/SearchComponent';
import ProductList from '../Components/ProductList'
import '../Css/SearchPage.css'


const GrocerySearchPage = () => {
  
  const { productsFromContext, addPage, page } = useContext(ProductContext)
  

  
    

  return (
    <>
    <div className="grocerySearchPage"> 
    <div className="img-div"></div>
    <div className="">
        <SearchComponent></SearchComponent>
    </div>
    <ProductList products={productsFromContext}></ProductList>
    {productsFromContext.length ? (
          <div page={page} className="col-12 d-flex jusitfy-content-center ">
          <button
            type="button"
            className="btn btn-dark mono-font"
            onClick={() => addPage()}>
            Ladda fler varor
          </button>
        </div>
        ) : null}
    
    
    
    </div>
    </>
  );
}

export default GrocerySearchPage;