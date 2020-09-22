import React from 'react';

const ProductItem = (props) => {
    
    let style = {
        width: '50%'
    }
    return ( 
            <div className="card mb-3">
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <img src={props.product.imageUrl} style={style} className="card-img" alt="..."/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{props.product.name}</h5>
                            <p className="card-text">Land: {props.product.originCountry}</p>
                            <p className="card-text">Leverantör: {props.product.brand}</p>
                        </div>
                    </div>
                </div>
            </div>
    );
}
 
export default ProductItem;