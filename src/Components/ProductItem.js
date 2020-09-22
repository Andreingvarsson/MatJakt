import React from 'react';

const ProductItem = (props) => {
    
    let pStyle = {
        fontSize: '0.7em' 
    
    }
    let titleStyle = {
        fontSize:  '1em'
    }
    let cardCont = {
        padding: '0.5em',
        boxShadow: '5px 10px #f0e4e4'
    }
    return ( 
            <div className="card mb-3" style={cardCont}>
                

                <div className="row no-gutters">
                    <div className="col-md-4 col-sm-4 col-l-4 col-xs-4">
                        <img src={props.product.imageUrl} className="card-img" alt="..."/>
                    </div>
                    <div className="col-md-5 col-sm-5 col-xs-4">
                        <div className="card-body">
                            <h5 className="card-title" style={titleStyle}>{props.product.name}</h5>
                            <p className="card-text" style={pStyle}>{props.product.originCountry}, {props.product.brand} </p>
                        </div>
                    </div>
                    <div className=" col-md-3 col-sm-3 col-xs-4">
                    <button type="button" className="btn btn-light">Lägg till</button>
                    </div>
                </div>
                
            </div>
    );
}
 
export default ProductItem;