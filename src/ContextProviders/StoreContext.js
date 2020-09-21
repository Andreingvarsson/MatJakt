import React, { createContext } from "react";

export const StoreContext = createContext();

const StoreContextProvider = (props) => {
//   const [productList, setProductList] = useState([]);
//   const [categoryList, setCategoryList] = useState([]);

  //   useEffect( async ()=> {
  //       getCategories();
  //   }, [])

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

  const values = {
    getProducts: getProducts,
    getCategories: getCategories,
    // categoryList: categoryList,
  };

  return (
    <StoreContext.Provider value={values}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
