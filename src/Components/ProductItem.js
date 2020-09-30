import React, { useContext, useEffect, useState } from "react";
import '../Css/productItem.css'
import '../Css/fonts.css'
import {ProductContext} from '../ContextProviders/ProductContext'
import { useLocation } from 'react-router-dom'

const ProductItem = (props) => {

  let stores = {
    1: "willys-back",
    2: "ica-back",
    3: "mathem-back"
  }
  const {addProductToList, removeProductFromList} = useContext(ProductContext)
  const [count, setCount] = useState(1);
  const [product, setProduct] = useState({});
  
  const location = useLocation();
  const isShoppingList = location.pathname === '/inkopslista';
  const addProductToContext = () => {
    let productInfo = {
      productDetails: product,
      amount: count
    }
    // console.log(product)
    addProductToList(productInfo)
    //addProductToList(prod)
  }

  useEffect(()=>{
    if(isShoppingList){
      setCount(props.product.amount)
      setProduct(props.product.productDetails)
    }else{
      setProduct(props.product)
    }
  },[])

  let pStyle = {
    fontSize: "0.7em",
  };
  let titleStyle = {
    fontSize: "1em",
  };
  let cardCont = {
    padding: "0.5em",
    boxShadow: "2px 5px lightgrey",
    
  };

  return (
    <div className="card mb-3 col-xl-3 col-l-4 col-md-4 col-sm-6 col-xs-6" style={cardCont} >
      <div className="col no-gutters ">
        <div className="d-flex justify-content-center">
          <img src={product.storeId !== 2? product.imageUrl
            : `https://assets.icanet.se/t_product_large_v1,f_auto/${product.imageUrl}.jpg`} className="card-img-top pic-height  " alt="..."/>
        </div>
          <div className="card-body">
            <h6 className="card-title text-center monospace-font solid" style={titleStyle}>{product.name}</h6>
          <h5 className="text-center monospace-font solid">{product.price} kr</h5>
          <p className="card-text text-center monospace-font" style={pStyle}>{product.productVolume}{product.productVolumeUnit}</p> 
          <p className="card-text text-center monospace-font" style={pStyle}>Jfr-pris {product.comparePrice}/{product.compareUnit}<span> - {product.originCountry}</span></p> 
          <p className="card-text text-center monospace-font" style={pStyle}></p> 
            <div className={stores[product.storeId]} ></div>    
          </div>
      </div>
        <div className="row  btn-div container mx-auto mtopbot">

          <div className="col-6">

            <div className="row d-flex align-middle">
              <button type="button" className=" btn btn-light col-4" onClick={()=> {if(count > 1){setCount(count-1)}}}> - </button>
              <p className="col-4 ">{count}</p>
              {/* need to fix css when more then 9 products */}
              <button type="button" className="btn btn-light col-4 " onClick={()=> {if(count < 9){setCount(count+1)}}}> + </button>
            </div>

          </div>
          <div className="col-6 d-flex justify-content-end no-pad-right">
            {isShoppingList?<button type="button" className="btn btn-light monospace-font" onClick={() => removeProductFromList(product)} >Ta Bort</button>:<button type="button" className="btn btn-light monospace-font" onClick={() => addProductToContext()}>Lägg till</button> }

          </div>
        </div>
    </div>
    
  );
};

export default ProductItem;
