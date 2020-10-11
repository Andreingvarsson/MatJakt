import React, { useState, useContext, useEffect } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Col,
  Row,
  Container,
} from "reactstrap";
import { StoreContext } from "../ContextProviders/StoreContext";
import { ProductContext } from "../ContextProviders/ProductContext";
import "../Css/SearchComponent.css";

const SearchComponent = (props) => {
  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const {
    getCategories,
    getProductsByCategory,
    getProductsBySearch,
  } = useContext(StoreContext);
  const {
    clearProductsToShow,
    addProductsToShow,
    productsFromContext,
    clearPage,
    page,
  } = useContext(ProductContext);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [searchWord, setSearchWord] = useState("");
  const [searchedWord, setSearchedWord] = useState({ search: "" });
  const [ecoState, setEcoState] = useState(false);
  const [swedishState, setSwedishState] = useState(false);

  const handleCheckboxChange = (whichBox) => {
    if (whichBox === "eco") {
      setEcoState(!ecoState);
    } else if (whichBox === "swedish") {
      setSwedishState(!swedishState);
    }
  };
  useEffect(() => {
    console.log(ecoState, " - eco");
    if (ecoState === true) {
      if (selectedCategory !== 0) {
        clearProductsToShow();
      } else if (searchedWord.search.length > 0) {
        clearProductsToShow();
      }
    } else if (ecoState === false) {
      if (selectedCategory !== 0) {
        clearPage();
        clearProductsToShow();
      } else if (searchedWord.search.length > 0) {
        clearPage();
        clearProductsToShow();
      }
    }
  }, [ecoState]);

  useEffect(() => {
    console.log(swedishState, " - swe");
    if (swedishState === true) {
      if (selectedCategory !== 0) {
        clearProductsToShow();
      } else if (searchedWord.search.length > 0) {
        clearPage();
        clearProductsToShow();
      }
    } else if (swedishState === false) {
      if (selectedCategory !== 0) {
        clearProductsToShow();
      } else if (searchedWord.search.length > 0) {
        clearPage();
        clearProductsToShow();
      }
    }
  }, [swedishState]);

  const fetchProductsBySearch = async (search) => {
    let result = await getProductsBySearch(
      search,
      page,
      ecoState,
      swedishState
    );
    setSelectedCategory(0);
    addProductsToShow(result);
  };

  const fetchCategories = async () => {
    let result = await getCategories();
    setCategoryList(result.anyCategories);
  };

  const fetchMoreProducts = async (select) => {
    let result = await getProductsByCategory(
      select,
      page,
      ecoState,
      swedishState
    );
    addProductsToShow(result);
  };

  useEffect(() => {
    if (selectedCategory !== 0) {
      fetchMoreProducts(selectedCategory);
    } else if (searchedWord.search) {
      fetchProductsBySearch(searchedWord.search);
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
      } else if (searchedWord.search) {
        fetchProductsBySearch(searchedWord.search);
      }
    }
  }, [productsFromContext]);

  useEffect(() => {
    clearPage();
    clearProductsToShow();
  }, [selectedCategory]);

  useEffect(() => {
    if (searchedWord.search.length > 0) {
      setSelectedCategory(0);
      clearProductsToShow();
      setCategoryTitle(`"${searchedWord.search}"`);
    }
  }, [searchedWord]);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const updateSearchWord = (event) => {
    setSearchWord(event);
  };

  const handleSearch = () => {
    if (searchWord.length > 0) {
      setSearchedWord({ search: searchWord });
      setSearchWord("");
    } else {
      setSearchedWord({ search: "" });
      clearProductsToShow();
      setCategoryTitle('""');
    }
  };

  const resetSearching = () => {
    setSelectedCategory(0);
    setCategoryTitle("");
    setSearchedWord({ search: "" });
    clearProductsToShow([]);
    setEcoState(false);
    setSwedishState(false);
  };

  const onKeyUp = (e) => {
    if (e.charCode === 13) {
      handleSearch();
    }
  };

  let buttonFocused = {
    backgroundColor: "#1d2124!important",
  };

  useEffect(() => {
    console.log(searchWord);
  }, [searchWord]);

  return (
    <>
      <Container>
        <Row className=" pad-top bg-white">
          <Col xs="6" sm="6" md="4" l="4">
            <Dropdown
              isOpen={dropdownOpen}
              toggle={toggle}
              className="dropdown-fix"
            >
              <DropdownToggle caret className="btn-dark mono-font">
                Alla kategorier
              </DropdownToggle>
              <DropdownMenu className="mono-font">
                {categoryList.map((category) => (
                  <DropdownItem
                    onClick={() => {
                      setSelectedCategory(category.categoryId);
                      setCategoryTitle(category.name);
                    }}
                    key={category.categoryId}
                  >
                    {category.name}
                  </DropdownItem>
                ))}
                <DropdownItem onClick={() => resetSearching()}>
                  Återställ
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Col>
          <Col xs="6" sm="6" md="4" l="">
            <Input
              type="text"
              className="form-control mono-font "
              placeholder="Sök produkt"
              onKeyPress={(e) => onKeyUp(e)}
              value={searchWord}
              onChange={(e) => updateSearchWord(e.target.value)}
              id="searchWord"
            />
          </Col>
          <Col md="4">
            <Row>
              <Col xs="6" sm="6">
                <span className="mr-2">EKO</span>
                <input
                  id="eco-check"
                  checked={ecoState}
                  type="checkbox"
                  value={ecoState}
                  onChange={(e) => handleCheckboxChange("eco")}
                />
              </Col>

              <Col xs="6" sm="6">
                <span className="mr-2">Svensk</span>
                <input
                  id="swe-check"
                  type="checkbox"
                  checked={swedishState}
                  value={swedishState}
                  onChange={(e) => handleCheckboxChange("swedish")}
                />
              </Col>
            </Row>
          </Col>
          {categoryTitle ? (
            <h5 className="category-title text-right col-l-12 col-sm-12">
              {categoryTitle}{" "}
            </h5>
          ) : null}
        </Row>
      </Container>
    </>
  );
};

export default SearchComponent;
