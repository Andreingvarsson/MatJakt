import React, { useContext, useEffect }  from 'react';
import { ProductContext } from '../ContextProviders/ProductContext';
import SearchComponent from  '../Components/SearchComponent';
import ProductList from '../Components/ProductList'
import '../Css/ProductListPage.css'
import '../Css/fonts.css'


const ProductListPage = () => {

    const { productsInList } = useContext(ProductContext)

    const compareProducts =  () =>{
      console.log(productsInList)
      // jobbar på get funktion i backend innan fortsätta här.
      

    }
    
    useEffect(()=>{
      
    },[productsInList])

  return (
    <>
    <div className=""> 
    <div className="img-list"></div>
        <h2 className="col-12 text-center monospace-font mt-5">Inköpslista</h2>
        <ProductList products={productsInList}></ProductList>
        <button className="btn-dark btn" onClick={compareProducts}>Jämför</button>
    </div>
    </>
  );
}

export default ProductListPage;