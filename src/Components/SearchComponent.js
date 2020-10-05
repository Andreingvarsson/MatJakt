import React, { useState, useContext, useEffect } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Label,
  Input,
} from "reactstrap";
import { StoreContext } from "../ContextProviders/StoreContext";
import { ProductContext } from "../ContextProviders/ProductContext";
import '../Css/SearchComponent.css'

const SearchComponent = (props) => {
  const [page, setPage] = useState(0);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const { getCategories, getProductsByCategory, getProductsBySearch } = useContext(StoreContext);
  const { clearProductsToShow, addProductsToShow, productsFromContext} = useContext(ProductContext);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [searchWord, setSearchWord] = useState('');
  const [searchedWord, setSearchedWord] = useState({search: ''});

//  Added useStates for eco / swedish.
 const [ecoState, setEcoState] = useState(false);
 const [swedishState, setSwedishState] = useState(false);

 // checkbox handler
 const handleCheckboxChange = (whichBox) => {
  if(whichBox === 'eco'){
    setEcoState(!ecoState)
  }else if(whichBox === 'swedish'){
    setSwedishState(!swedishState)
  }
 }
// useEffect in progress for searching products eco
 useEffect(() => {
   console.log(ecoState, ' - eco')
   if(ecoState === true){
     if(selectedCategory !== 0){
       clearProductsToShow()
     }else if(searchedWord.search.length > 0){
      clearProductsToShow()
    } 
  }else if(ecoState === false){
    if(selectedCategory !== 0){
      clearProductsToShow()
    }else if(searchedWord.search.length > 0){
      clearProductsToShow()
    }
  }
 },[ecoState])

// useEffect in progress for searching products swedish
 useEffect(() => {
  console.log(swedishState , ' - swe')
  if(swedishState === true){

    if(selectedCategory !== 0){
      clearProductsToShow()
    }else if(searchedWord.search.length > 0){
      clearProductsToShow()
    } 
  }else if(swedishState === false){
    if(selectedCategory !== 0){
      clearProductsToShow()
    }else if(searchedWord.search.length > 0){
      clearProductsToShow()
    }
  }
},[swedishState])

  const fetchProductsBySearch = async (search) => {
    let result = await getProductsBySearch(search, page, ecoState, swedishState)
    setSelectedCategory(0)
    addProductsToShow(result);
  }

  const fetchCategories = async () => {
    let result = await getCategories();
    setCategoryList(result.anyCategories);
  };

  const fetchMoreProducts = async (select) => {
    let result = await getProductsByCategory(select, page, ecoState, swedishState);
    addProductsToShow(result);
  };

  useEffect(() => {
    if(selectedCategory !== 0){
      fetchMoreProducts(selectedCategory);
    }
    else if(searchedWord.search){
      fetchProductsBySearch(searchedWord.search)
    }
  }, [page]);
 
  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (productsFromContext.length === 0) {
      if (selectedCategory !== 0) {
        fetchMoreProducts(selectedCategory);
      }else if(searchedWord.search){
        fetchProductsBySearch(searchedWord.search)
        //setSearchedWord('')
      }
    }
  }, [productsFromContext]);

  useEffect(() => {
    setPage(0);
    clearProductsToShow();
  }, [selectedCategory]);

  useEffect(() => {
    if(searchedWord.search.length > 0){
      setSelectedCategory(0)
      clearProductsToShow();
      setCategoryTitle(`"${searchedWord.search}"`)
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
      setSearchedWord({search:searchWord})
      setSearchWord('')
    }else{
      setSearchedWord({search: ''})
      clearProductsToShow();
      setCategoryTitle('""')
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
              <DropdownToggle caret className="btn-dark mono-font">Alla kategorier</DropdownToggle>
              <DropdownMenu className="mono-font">
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
              <Input type="text" className="form-control mono-font" placeholder="Sök produkt" onKeyPress={e => onKeyUp(e)}  value={searchWord} onChange={e => updateSearchWord(e.target.value)} id="searchWord"/>  
          </div>
          <div className="col-4 mt-5">
            <Label className="col-3">
            <Input className="" type="checkbox" value={ecoState} onChange={e => handleCheckboxChange('eco')}/>
            eco
            </Label>
            <Label className="col-3">
            <Input  type="checkbox" value={swedishState} onChange={e => handleCheckboxChange('swedish')}/>
            svensk
            </Label>
          </div>
      
        
          {categoryTitle? <h5 className="category-title text-right col-l-12 col-sm-12">{categoryTitle} </h5>: null}
        </div>
        <div className="row align-self-start">
          {/* {products.map((product, i) => (
            <ProductItem
              key={product.productId + "a" + i}
              product={product}
            ></ProductItem>
          ))} */}
          {/* {productsFromContext.map((product, i) => (
            <ProductItem
              key={product.productId + "a" + i}
              product={product}
            ></ProductItem>
          ))} */}
        </div>
        {productsFromContext.length ? (
          <div className="col-12 d-flex jusitfy-content-center ">
          <button
            style={btnStyle}
            type="button"
            className="btn btn-dark mono-font"
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
