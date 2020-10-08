
import React, { useState, useContext, useEffect } from "react";

import  ProductItem  from './ProductItem'
import StoreContext from '../ContextProviders/StoreContext'

const SearchComponent = (props) => {

    const { ProductsToShow } = useContext(StoreContext);
    const [products, setProducts] = useState([])
  
  useEffect(() => {
    setProducts(ProductsToShow)
  }, [ProductsToShow]);

  return (
    <>
    
          <div className="">
          {products.map((product) => (
          <ProductItem key={product.productId} product={product}></ProductItem>))}
          </div>
      
    </>
  );
};

export default SearchComponent;
