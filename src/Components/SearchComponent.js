import React, { useState, useContext, useEffect } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Label,
  Input,
  Form
} from "reactstrap";
import { StoreContext } from "../ContextProviders/StoreContext";
import ProductItem from "./ProductItem";
import '../Css/SearchComponent.css'

const SearchComponent = (props) => {
  const [page, setPage] = useState(0);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const { getCategories, getProductsByCategory, getProductsBySearch, setProducts, products } = useContext(StoreContext);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [productsToShow, setProductsToShow] = useState([]);
  //const [products, setProducts] = useState(products);
  const [searchWord, setSearchWord] = useState('');
  const [searchedWord, setSearchedWord] = useState('');

  const fetchProductsBySearch = async (search) => {
    let result = await getProductsBySearch(search, page)
    //setProductsToShow([])
    setSelectedCategory(0)
    let newList = [...productsToShow,...result]
    setProductsToShow(newList)
  }

  const fetchCategories = async () => {
    let result = await getCategories();
    setCategoryList(result.anyCategories);
  };

  const fetchMoreProducts = async (select) => {
    let result = await getProductsByCategory(select, page);
    let newList = [...productsToShow/*products*/, ...result];
    //setProducts(newList)
    setProductsToShow(newList);
  };

  useEffect(() => {
    if(selectedCategory !== 0){
      fetchMoreProducts(selectedCategory);
    }
    else if(searchedWord){
      fetchProductsBySearch(searchedWord)
    }
  }, [page]);
 
  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (productsToShow.length /*products*/ === 0) {
      if (selectedCategory !== 0) {
        fetchMoreProducts(selectedCategory);
      }else if(searchedWord){
        fetchProductsBySearch(searchedWord)
      }
    }
  }, [productsToShow]);

  useEffect(() => {
    setPage(0);
    //setProducts([])
    setProductsToShow([]);
  }, [selectedCategory]);
  useEffect(() => {
    if(searchedWord.length > 0){
      setSelectedCategory(0)
      setProductsToShow([])
      setCategoryTitle(`"${searchedWord}"`)
    }
  }, [searchedWord]);

  let btnStyle = {
    margin: "2rem",
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const updateSearchWord = (event) => {
    setSearchWord(event)
  }

  const handleSearch = () => {
    if(searchWord.length > 0){
      setSearchedWord(searchWord)
      setSearchWord('')
      // setSelectedCategory(0)
      // setProductsToShow([])
      // setCategoryTitle(`"${searchWord}"`)
    }else{
      setProductsToShow([])
      setCategoryTitle('')
    }
  }

  const onKeyUp = (e) => {
    if(e.charCode === 13){
      handleSearch()
    }
  }

  useEffect(()=>{
    console.log(searchWord)
  },[searchWord])



  return (
    <>
      <div className="searchComponent container ">
       
          <div className="row ">
          <div className="col-sm-4 col-md-4 col-l-4 mt-5 no-pad">
            <Dropdown isOpen={dropdownOpen} toggle={toggle} className="">
              <DropdownToggle caret className="btn-dark">Alla kategorier</DropdownToggle>
              <DropdownMenu>
                {categoryList.map((category) => (
                  <DropdownItem onClick={() => {setSelectedCategory(category.categoryId); setCategoryTitle(category.name);}}
                    key={category.categoryId}>
                    {category.name}
                  </DropdownItem>
                ))}
                <DropdownItem
                  onClick={() => {
                    setSelectedCategory(0);
                    setCategoryTitle(""); /*setPage(0)*/
                  }}
                >
                  Återställ
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="col-sm-8 col-md-4 col-l-4 col-xl-4 mt-5">
              <Input type="text" className="form-control" placeholder="Sök produkt" onKeyPress={e => onKeyUp(e)}  value={searchWord} onChange={e => updateSearchWord(e.target.value)} id="searchWord"/>  
          </div>
          {categoryTitle? <h5 className="category-title text-right col-l-12 col-sm-12">{categoryTitle} </h5>: null}
        </div>
        <div className="row align-self-start">
          {products.map((product, i) => (
            <ProductItem
              key={product.productId + "a" + i}
              product={product}
            ></ProductItem>
          ))}
          {productsToShow.map((product, i) => (
            <ProductItem
              key={product.productId + "a" + i}
              product={product}
            ></ProductItem>
          ))}
        </div>
        {productsToShow.length ? (
          <div className="col-12 d-flex jusitfy-content-center">
          <button
            style={btnStyle}
            type="button"
            className="btn btn-dark"
            onClick={
              () => setPage(page + 1) /*fetchMoreProducts(selectedCategory)*/
            }
            >
            Ladda fler varor
          </button>
        </div>
        ) : null}
      </div>
    </>
  );
};

export default SearchComponent;
