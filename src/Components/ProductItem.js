import React from "react";
import '../Css/productItem.css'

const ProductItem = (props) => {

  let stores = {
    1: "willys-back",
    2: "ica-back",
    3: "mathem-back"
  }
  
  let background = {
    
    background: "url(" + stores[props.product.storeId] + ") no-repeat center",
    backgroundSize: 'cover'
  }

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
    <div className="card mb-3 col-xl-3 col-l-4 col-md-4 col-sm-6 col-xs-6 " style={cardCont} >
      <div className="col no-gutters ">
        <div className="">
          <img src={props.product.storeId !== 2? props.product.imageUrl
            : `https://assets.icanet.se/t_product_large_v1,f_auto/${props.product.imageUrl}.jpg`} className="card-img-top " alt="..."/>
        </div>
        
          <div className="card-body">
            <h6 className="card-title text-center" style={titleStyle}>{props.product.name}</h6>
          <h5 className="text-center">{props.product.price} kr</h5>
          <p className="card-text text-center" style={pStyle}>{props.product.productVolume}{props.product.productVolumeUnit}</p> 
          <p className="card-text text-center" style={pStyle}>Jfr-pris {props.product.comparePrice}/{props.product.compareUnit}<span> - {props.product.originCountry}</span></p> 
          <p className="card-text text-center" style={pStyle}></p> 
            <div className={stores[props.product.storeId]} ></div>    
          </div>
      </div>
        <div className="">
          <button type="button" className="btn btn-light">
            Lägg till
          </button>
        </div>
    </div>
    
  );
};

export default ProductItem;
