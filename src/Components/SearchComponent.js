import React, { useState, useContext, useEffect } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { StoreContext } from "../ContextProviders/StoreContext";

const SearchComponent = (props) => {
  //   const [liveCategoryList, setLiveCategoryList] = useState([]);

  const [categoryList, setCategoryList] = useState([]);

  const { getCategories } = useContext(StoreContext);

  const fetchCategories = async () => {
    let result = await getCategories();
    console.log(result.anyCategories);
    await setCategoryList(result.anyCategories);
    console.log(categoryList);
  };

  useEffect(() => {
    fetchCategories();

    console.log(categoryList);
    // eslint-disable-next-line
  }, []);

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
            <DropdownToggle caret>Kategorier</DropdownToggle>
            <DropdownMenu>
              {categoryList.map((category) => (
                <DropdownItem key={category.categoryId}>
                  {category.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default SearchComponent;
