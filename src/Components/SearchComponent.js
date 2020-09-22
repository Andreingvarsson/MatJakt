import React, { useState, useContext, useEffect } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { StoreContext } from "../ContextProviders/StoreContext";
import  ProductItem  from './ProductItem'

const SearchComponent = (props) => {
  //   const [liveCategoryList, setLiveCategoryList] = useState([]);

  const [categoryList, setCategoryList] = useState([]);

  const { getCategories, getProductsByCategory } = useContext(StoreContext);

  const [selectedCategory, setSelectedCategory] = useState(0);

  const [productsToShow, setProductsToShow] = useState([]);

  const fetchCategories = async () => {
    let result = await getCategories();
    console.log(result.anyCategories);
    await setCategoryList(result.anyCategories);
    
  };

  const fetchCategoryProducts = async (select) => {
    let result = await getProductsByCategory(select)
    await setProductsToShow(result)
  }

  useEffect(() => {
    fetchCategories();
    setSelectedCategory(0);
    console.log(categoryList);
    console.log(selectedCategory)
    // eslint-disable-next-line
  }, []);

  useEffect(()=> {
    if(selectedCategory === 0){
      setProductsToShow([])
    }else{
      fetchCategoryProducts(selectedCategory);
    }
    console.log(selectedCategory)
  },[selectedCategory])

  //   useEffect(() => {
  //       console.log(categoryList)
  //       setLiveCategoryList(categoryList);
  //       console.log(liveCategoryList);

  //   }, [categoryList]);

  //   const checkCategories = async  () =>{
  //       let obj = await getCategories();
  //       return obj;
  //   }

  // We need to loop the categories in a for loop to display in the dropdownmenu.
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  
  return (
    <>
      <div className="searchComponent">
        <div className="container ">
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>Alla kategorier</DropdownToggle>
            <DropdownMenu>
              {categoryList.map((category) => (
                <DropdownItem  onClick={() => setSelectedCategory(category.categoryId)}key={category.categoryId}>
                  {category.name}
                </DropdownItem>
              ))}
              <DropdownItem onClick={() => setSelectedCategory(0)}>Återställ</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <div>
          {productsToShow.map((product) => (
          <ProductItem key={product.productId} product={product}></ProductItem>))}

          </div>
        </div>
      </div>
    </>
  );
};

export default SearchComponent;
