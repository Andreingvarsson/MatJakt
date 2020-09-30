import React, { useState, useContext, useEffect } from "react";

import ProductItem from "./ProductItem";

const SearchComponent = (props) => {
  return (
    <>
      <div className="container">
        <div className="row">
          {props.products.map((product) => (
            <ProductItem
              key={(product.product ? product.product : product).productId}
              product={product}
            ></ProductItem>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchComponent;
