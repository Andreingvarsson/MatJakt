import React, { createContext, useDebugValue, useEffect, useState } from "react";

export const StoreContext = createContext();

const StoreContextProvider = (props) => {
//   const [productList, setProductList] = useState([]);
//   const [categoryList, setCategoryList] = useState([]);

  //   useEffect( async ()=> {
  //       getCategories();
  //   }, [])

  const [productsToShow, setProductsToShow] = useState([])
  

  const getProducts = async () => {
    let res = await fetch("/api/sort");
    res = await res.json();
    console.log(res);
  };

  const getCategories = async () => {
    let res = await fetch("/api/categories"); // api to get categories.. whats the right "name"..
    try {
      res = await res.json();
      return res;
    } catch (e) {
      console.log("This is the error!! " + e);
    }
  };

  const getProductsByCategory = async (categoryId, page=0) => {
    console.log('Inne i getProductsByCat - id: ' + categoryId)
    let res = await fetch(`/api/catProducts/${categoryId}?limit=10&page=${page}` ); // api to get categories.. whats the right "name"..
    try {
      res = await res.json();
      //console.log(res[0])
      // setProductsToShow(res);
      return res;
    } catch (e) {
      console.log("This is the error!! " + e);
    }
  };

  const values = {
    getProducts: getProducts,
    getCategories: getCategories,
    getProductsByCategory: getProductsByCategory,
    productsToShow: productsToShow
    // categoryList: categoryList,
  };

  return (
    <StoreContext.Provider value={values}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
