import React, { useState, useContext, useEffect } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import { StoreContext } from "../ContextProviders/StoreContext";
import ProductItem from "./ProductItem";

const SearchComponent = (props) => {
  const [page, setPage] = useState(0);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const { getCategories, getProductsByCategory } = useContext(StoreContext);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [productsToShow, setProductsToShow] = useState([]);

  const fetchCategories = async () => {
    let result = await getCategories();
    setCategoryList(result.anyCategories);
  };

  const fetchMoreProducts = async (select) => {
    let result = await getProductsByCategory(select, page);
    let newList = [...productsToShow, ...result];
    setProductsToShow(newList);
  };

  useEffect(() => {
    fetchMoreProducts(selectedCategory);
  }, [page]);

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (productsToShow.length === 0) {
      if (selectedCategory !== 0) {
        fetchMoreProducts(selectedCategory);
      }
    }
  }, [productsToShow]);

  useEffect(() => {
    setPage(0);
    setProductsToShow([]);
  }, [selectedCategory]);

  let dropStyle = {
    margin: "1.5rem 0rem",
  };
  let btnStyle = {
    margin: "2rem",
  };

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

            <ListGroup>
            {categoryList.map((category) => (
                  <ListGroupItem
                    onClick={() => {
                      setSelectedCategory(category.categoryId);
                      setCategoryTitle(category.name);
                    }}
                    key={category.categoryId}
                  >
                    {category.name}
               </ListGroupItem>
                    ))}
                <ListGroupItem        onClick={() => {
                    setSelectedCategory(0);
                    setCategoryTitle(""); /*setPage(0)*/
                  }}
                >
                 Återställ</ListGroupItem>
  
    </ListGroup>





          </div>
          <h5 className="col-6" style={dropStyle}>
            {categoryTitle}
          </h5>
        </div>
        <div className="">
          {productsToShow.map((product, i) => (
            <ProductItem
              key={product.productId + "a" + i}
              product={product}
            ></ProductItem>
          ))}
        </div>
        {productsToShow.length ? (
          <button
            style={btnStyle}
            type="button"
            className="btn btn-primary"
            onClick={
              () => setPage(page + 1) /*fetchMoreProducts(selectedCategory)*/
            }
          >
            Ladda fler
          </button>
        ) : null}
      </div>
    </>
  );
};

export default SearchComponent;
