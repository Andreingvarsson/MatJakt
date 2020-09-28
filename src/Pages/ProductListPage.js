import React, { useContext, useEffect }  from 'react';
import { ProductContext } from '../ContextProviders/ProductContext';
import SearchComponent from  '../Components/SearchComponent';
import ProductList from '../Components/ProductList'
import '../Css/ProductListPage.css'
import '../Css/fonts.css'


const ProductListPage = () => {



    const {productsInList } = useContext(ProductContext)
    useEffect(()=>{
      
    },[productsInList])

  return (
    <>
    <div className=""> 
    <div className="img-list"></div>
        <h2 className="col-12 text-center monospace-font mt-5">Inköpslista</h2>
        <ProductList products={productsInList}></ProductList>
    </div>
    </>
  );
}

export default ProductListPage;