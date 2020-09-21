import React, { useContext }  from 'react';
import { StoreContext } from '../ContextProviders/StoreContext';
import SearchComponent from  '../Components/SearchComponent'


const GrocerySearchPage = () => {



    const {getProducts} = useContext(StoreContext)


  return (
    <>
    <div className="grocerySearchPage"> 
    <h1>GrocerySearchPage</h1>

    <SearchComponent></SearchComponent>
    <input></input>
    
    <button onClick={()=> getProducts()}>Hämta produkter</button>
    </div>
    </>
  );
}

export default GrocerySearchPage;