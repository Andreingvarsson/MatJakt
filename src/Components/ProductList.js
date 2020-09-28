
import React, { useState, useContext, useEffect } from "react";

import  ProductItem  from './ProductItem'

const SearchComponent = (props) => {

  const getProduct = (product) => {
    return product.product? product.product: product;
  }
  return (
    <>
    
          <div className="container">
          <div className="row">

          {props.products.map((product,i) => (
            <ProductItem key={product.productId+'x'+i} product={product}></ProductItem>))}
          </div>
          </div>
      
    </>
  );
};

export default SearchComponent;
