import React, {createContext, useEffect, useState} from "react";



export const StoreContext = createContext();

const StoreContextProvider = (props) =>{
    const [prooductList, setProoductList] = useState([]);

    const  getProducts = async ()  => {
        let res = await fetch("/api/sort");
        res = await res.json();
        console.log(res)
    }

    const values = {getProducts};

    return(
        <StoreContext.Provider value={values}>
            {props.children}
        </StoreContext.Provider>



    )
} 

export default StoreContextProvider;
