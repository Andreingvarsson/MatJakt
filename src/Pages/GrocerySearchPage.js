import React, { useContext }  from 'react';
import { StoreContext } from '../ContextProviders/StoreContext';
import SearchComponent from  '../Components/SearchComponent';
import ProductList from '../Components/ProductList'


const GrocerySearchPage = () => {



    const {getProducts} = useContext(StoreContext)


  return (
    <>
    <div className="grocerySearchPage container"> 

    {/* <input></input> */}
    
    {/* <button onClick={()=> getProducts()}>Hämta produkter</button> */}
    <SearchComponent></SearchComponent>
    {/* <ProductList></ProductList> */}
    </div>
    </>
  );
}

export default GrocerySearchPage;