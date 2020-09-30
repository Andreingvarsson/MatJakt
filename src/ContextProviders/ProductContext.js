import React, {createContext, useState} from 'react';

export const ProductContext = createContext();

const ProductContextProvider = (props) => {

    const [productsFromContext, setProductsFromContext] = useState([]);
    const [productsInList, setProductsInList] = useState([]);


    const addProductsToShow = (update) => {
        let newList = [...productsFromContext,...update]
        setProductsFromContext(newList)
    }

    const clearProductsToShow = () => {
        setProductsFromContext([])
    }

    const addProductToList = (product) => {
        let found = productsInList.filter(p => p.productDetails.productId === product.productDetails.productId)
        if(!found.length){

            let newList = [...productsInList, product]
            setProductsInList(newList)
            console.log(productsInList.length +' - produktlista')
        }
    }

    const removeProductFromList = (product) => {
        console.log(product.productId+ ' - productID')
        console.log(productsInList)
        let newList = productsInList.filter(p =>  p.productDetails.productId !== product.productId)
        console.log(newList + ' newlist efter delete')
        setProductsInList(newList)
    }

    const values ={
        addProductToList: addProductToList,
        removeProductFromList: removeProductFromList,
        addProductsToShow: addProductsToShow,
        clearProductsToShow: clearProductsToShow,
        productsFromContext: productsFromContext,
        productsInList: productsInList,


    }

    return (
        <ProductContext.Provider value={values}>
            {props.children}
        </ProductContext.Provider>
    );
}
export default ProductContextProvider;