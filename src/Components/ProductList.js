import React from "react";

import ProductItem from "./ProductItem";

const SearchComponent = (props) => {
  return (
    <>
      <div className="container">
        <div className="row">
          {props.products.map((product) => (
            <ProductItem
              key={(product.productDetails ? product.productDetails : product).productId}
              product={product}
            ></ProductItem>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchComponent;
