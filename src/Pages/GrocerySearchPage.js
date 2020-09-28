import React, { useContext }  from 'react';
import { StoreContext } from '../ContextProviders/StoreContext';
import SearchComponent from  '../Components/SearchComponent';
import ProductList from '../Components/ProductList'
import '../Css/SearchPage.css'


const GrocerySearchPage = () => {



    const {getProducts} = useContext(StoreContext)


  return (
    <>
    <div className="grocerySearchPage"> 
    <div className="img-div"></div>
        <SearchComponent></SearchComponent>

    {/* <input></input> */}
    
    {/* <button onClick={()=> getProducts()}>Hämta produkter</button> */}
    
    {/* <ProductList></ProductList> */}
    </div>
    </>
  );
}

export default GrocerySearchPage;