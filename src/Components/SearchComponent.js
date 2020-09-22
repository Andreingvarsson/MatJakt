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

  const [page, setPage] = useState(0)
  const [categoryTitle, setCategoryTitle] = useState('')
  const [categoryList, setCategoryList] = useState([]);
  const { getCategories, getProductsByCategory } = useContext(StoreContext);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [productsToShow, setProductsToShow] = useState([]);

  const fetchCategories = async () => {
    let result = await getCategories();
    setCategoryList(result.anyCategories);
    
  };

  const fetchCategoryProducts = async (select) => {
    setPage(0)
    //let result = await getProductsByCategory(select)
    //setProductsToShow(result)
  }

  const fetchMoreProducts = async (select) => {
    //setPage(page+1)
    //page+=1;

    let result = await getProductsByCategory(select, page)
    let newList = [...productsToShow,...result];
    setProductsToShow(newList)
  }

  useEffect(() => {
   

      fetchMoreProducts(selectedCategory)
    
  }, [page]);
  
  //First Render
  useEffect(() => {
    fetchCategories();
    // setSelectedCategory(0);
    // setPage(0)
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if(productsToShow.length === 0){
      if(selectedCategory !== 0){
        fetchMoreProducts(selectedCategory)}
    }
  }, [productsToShow]);

  useEffect(()=> {
    
    setPage(0)
    setProductsToShow([])
    console.log(productsToShow.length + ' - LLEEEEEEENGTH')
    // if(selectedCategory !== 0){
    //   fetchMoreProducts(selectedCategory)
    //   console.log(productsToShow.length + 'EFTER')
    // }else{
    //   //fetchCategoryProducts(selectedCategory);
    // }
    console.log(selectedCategory)
  },[selectedCategory])

  let dropStyle = {
    margin: '1.5rem 0rem'
  }

  let btnStyle = {
    margin: '2rem'
  }
  

  // We need to loop the categories in a for loop to display in the dropdownmenu.
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <>
      <div className="searchComponent">
        <div className="container row">
          <div className="col-6">
            <Dropdown isOpen={dropdownOpen} toggle={toggle} style={dropStyle}>
              <DropdownToggle caret>Alla kategorier</DropdownToggle>
                <DropdownMenu>
                  {categoryList.map((category) => (
                  <DropdownItem  onClick={() => {setSelectedCategory(category.categoryId); setCategoryTitle(category.name)}}key={category.categoryId}>
                  {category.name}
                  </DropdownItem>
                ))}
                <DropdownItem onClick={() => {setSelectedCategory(0); setCategoryTitle('')/*setPage(0)*/}}>Återställ</DropdownItem>
              </DropdownMenu>
            </Dropdown>
        </div>
          <h5 className="col-6" style={dropStyle}>{categoryTitle}</h5>
        </div>
          <div className="">
          {productsToShow.map((product,i) => (
            <ProductItem key={product.productId+'a'+i} product={product}></ProductItem>))}
          </div>
        {productsToShow.length? <button style={btnStyle} type="button" className="btn btn-primary" onClick={()=> setPage(page+1)/*fetchMoreProducts(selectedCategory)*/}>Ladda fler</button>: null}
      </div>
    </>
  );
};

export default SearchComponent;
