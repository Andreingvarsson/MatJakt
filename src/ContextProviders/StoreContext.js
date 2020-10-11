import React, {createContext} from "react";

export const StoreContext = createContext();

const StoreContextProvider = (props) => {

  const getProducts = async () => {
    let res = await fetch("/api/sort");
    res = await res.json();
    console.log(res);
  };

  const getCategories = async () => {
    let res = await fetch("/api/categories"); 
    try {
      res = await res.json();
      return res;
    } catch (e) {
      console.log("This is the error!! " + e);
    }
  };

  const getProductsByCategory = async (categoryId, page = 0, eco, swe) => {
    console.log("Inne i getProductsByCat - id: " + categoryId);
    let res = await fetch(
      `/api/catProducts/${categoryId}?limit=10&page=${page}&eco=${eco}&swe=${swe}`
    ); 
    try {
      res = await res.json();
      return res;
    } catch (e) {
      console.log("This is the error!! " + e);
    }
  };

  const getProductsBySearch = async (searchWord, page = 0, eco, swe) => {
    console.log("Inne i getProductsBySearch - id: " + searchWord);
    let res = await fetch(
      `/api/searchProducts/${searchWord}?limit=10&page=${page}&eco=${eco}&swe=${swe}`
    ); 
    try {
      res = await res.json();
      console.log(res[0])
      return res;
    } catch (e) {
      console.log("This is the error!! " + e);
    }
  };

  const values = {
    getProducts: getProducts,
    getCategories: getCategories,
    getProductsByCategory: getProductsByCategory,
    getProductsBySearch: getProductsBySearch,
  };

  return (
    <StoreContext.Provider value={values}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
