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
        console.log(product)
        let newList = [...productsInList, product]
        setProductsInList(newList)
        console.log(productsInList.length +' - produktlista')
    }

    const removeProductFromList = (product) => {
        console.log(product.productId+ ' - productID')
        console.log(productsInList)
        let newList = productsInList.filter(p => { console.log(p.product.productId + 'proID'); return p.product.productId !== product.productId})
        newList.forEach(p => console.log(p.product.productId+' - kiss'))
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