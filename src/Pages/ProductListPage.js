import React, { useContext }  from 'react';
import { StoreContext } from '../ContextProviders/StoreContext';
import SearchComponent from  '../Components/SearchComponent';
import ProductList from '../Components/ProductList'
import '../Css/ProductListPage.css'
import '../Css/fonts.css'


const ProductListPage = () => {



    const {getProducts} = useContext(StoreContext)


  return (
    <>
    <div className=""> 
    <div className="img-list"></div>
        <h2 className="col-12 text-center monospace-font mt-5">Inköpslista</h2>
        {/* <ProductList></ProductList> */}
    </div>
    </>
  );
}

export default ProductListPage;