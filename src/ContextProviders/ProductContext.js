import React, {createContext, useState} from 'react';

export const ProductContext = createContext();

const ProductContextProvider = (props) => {

    const [products, setProducts] = useState([]);


    const addProduct = (product) => {
        console.log(product+ ' - inne i proCont')
        
        setProducts([...products,...product])
    }

    const removeProduct = (product) => {
        setProducts(products.filter(p => p !== product))
    }

    const values ={
        products: products,
        addProduct: addProduct,
        removeProduct: removeProduct
    }

    return (
        <ProductContext.Provider value={values}>
            {props.children}
        </ProductContext.Provider>
    );
}
export default ProductContextProvider;