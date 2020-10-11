import React, {createContext, useState} from 'react';

export const ProductContext = createContext();

const ProductContextProvider = (props) => {

    const [productsFromContext, setProductsFromContext] = useState([]);
    const [productsInList, setProductsInList] = useState([]);
    const [page, setPage] = useState(0);

    const addPage = () => {
        setPage(page +1);
    }

    const clearPage = () => {
        setPage(0)
    }

    const addProductsToShow = (update) => {
        let newList = [...productsFromContext,...update]
        if(newList.length === 0 && productsFromContext.length === 0){ return; }
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
        }
    }

    const removeProductFromList = (product) => {
        let newList = productsInList.filter(p =>  p.productDetails.productId !== product.productId)
        setProductsInList(newList)
    }

    const values ={
        addProductToList: addProductToList,
        removeProductFromList: removeProductFromList,
        addProductsToShow: addProductsToShow,
        clearProductsToShow: clearProductsToShow,
        productsFromContext: productsFromContext,
        productsInList: productsInList,
        addPage: addPage,
        clearPage: clearPage,
        page:page
    }

    return (
        <ProductContext.Provider value={values}>
            {props.children}
        </ProductContext.Provider>
    );
}
export default ProductContextProvider;