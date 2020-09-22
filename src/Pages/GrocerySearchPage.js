import React, { useContext }  from 'react';
import { StoreContext } from '../ContextProviders/StoreContext';
import SearchComponent from  '../Components/SearchComponent';



const GrocerySearchPage = () => {



    const {getProducts} = useContext(StoreContext)


  return (
    <>
    <div className="grocerySearchPage container"> 
    <h1>Sök varor</h1>

    {/* <input></input> */}
    
    {/* <button onClick={()=> getProducts()}>Hämta produkter</button> */}
    <SearchComponent></SearchComponent>
    </div>
    </>
  );
}

export default GrocerySearchPage;