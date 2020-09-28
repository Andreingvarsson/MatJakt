import React, { useContext, useState }  from 'react';
import { StoreContext } from '../ContextProviders/StoreContext';
import { ProductContext } from '../ContextProviders/ProductContext';
import SearchComponent from  '../Components/SearchComponent';
import ProductList from '../Components/ProductList'
import '../Css/SearchPage.css'


const GrocerySearchPage = () => {
  
    
    const {productsFromContext} = useContext(ProductContext)


  return (
    <>
    <div className="grocerySearchPage"> 
    <div className="img-div"></div>
    <div className="">
        <SearchComponent></SearchComponent>
    </div>
    <ProductList products={productsFromContext}></ProductList>
    {/* <button  className="btn btn-dark container top-btn"> till toppen</button> */}
    {/* <input></input> */}
    
    {/* <button onClick={()=> getProducts()}>Hämta produkter</button> */}
    
    </div>
    </>
  );
}

export default GrocerySearchPage;