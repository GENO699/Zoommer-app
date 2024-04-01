/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NavigationButton from "./NavigationButton";
import CartButton from "./CartButton";
import SignInButton from "./SignInButton";
import ToggleDarkMode from "./ToggleDarkMode";
import image from "../images/main-logo.svg";

function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();
  const history = useNavigate();
  const searchResultsRef = useRef(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/cart", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        setCartItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setLoading(false);
      }
    };
    fetchCartItems();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const redirectToProfile = () => {
    history("/");
  };

  const handleLiveSearch = async (query) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/product?page=1&pageSize=75`
      );
      const allProducts = response.data.products;
      const filteredProducts = allProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredProducts);
      setShowResults(true);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
      setShowResults(false);
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    handleLiveSearch(query);
  };

  const handleProductClick = (productId) => {
    history(`/product/${productId}`);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="header-container w-full h-[9vh] flex justify-center items-center bg-gray-200 dark:bg-slate-900 fixed top-0 left-0 right-0  z-50 ">
      <div className="w-[85%] h-[10vh] flex justify-between items-center">
        <div className="w-[15%] h-[auto] flex justify-start items-center">
          <Link to={"/"}>
            <img className="cursor-pointer" src={image} alt="Logo" />
          </Link>
        </div>

        <div className=" sm-hidden search-container w-[47%] h-[auto]  flex justify-around items-center relative">
          <div className="hidden 2xl:block">
            <NavigationButton />
          </div>

          <div className="w-[auto] h-[auto] flex flex-col relative">
            <div className="hidden 2xl:block ">
              <FontAwesomeIcon
                className="absolute top-4 left-4 text-xl text-orange-600 pointer-events-none"
                icon={faSearch}
              />
              <input
                className="pl-14 w-[460px] h-[50px] rounded-xl border border-rose-400 dark:bg-slate-700"
                type="text"
                placeholder={t("Search")}
                value={searchQuery}
                onChange={handleInputChange}
              />
            </div>

            {showResults && !menuOpen && (
              <div
                ref={searchResultsRef}
                className="search-results rounded-xl dark:bg-slate-700 "
              >
                {loading ? (
                  <div className="rounded-xl"></div>
                ) : (
                  <div className="w-[100%] h-[auto] flex pl-4 pr-4 pb-2 dark:bg-slate-700  ">
                    <ul className="w-[100%] flex flex-col">
                      {searchResults.map((product) => (
                        <Link to={`/product/${product.id}`} key={product.id}>
                          <li
                            className="w-[100%] p-3 mt-2 cursor-pointer dark:bg-slate-600 bg-gray-100 rounded-xl dark:text-white flex"
                            onClick={() => handleProductClick(product.id)}
                          >
                            <img
                              src={product.image}
                              className="w-[25px] h-[25px]"
                              alt="image"
                            />
                            {product.title} - {product.price} ₾
                          </li>
                        </Link>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className=" md-hidden menu-container w-[35%] h-[auto] flex justify-end gap-3 items-center">
          <div className={`hidden 2xl:block ${menuOpen ? "flex-col" : "flex"}`}>
            <CartButton cartItems={cartItems} />
          </div>
          <div className={`hidden 2xl:block ${menuOpen ? "flex-col" : "flex"}`}>
            <SignInButton onLoginSuccess={redirectToProfile} />
          </div>
          <div className={`hidden 2xl:block ${menuOpen ? "flex-col" : "flex"}`}>
            <ToggleDarkMode />
          </div>
          <div className="inline-block 2xl:hidden ">
            <FontAwesomeIcon
              icon={faBars}
              className="text-2xl cursor-pointer "
              onClick={toggleMenu}
            />
          </div>
        </div>
      </div>
      {menuOpen && (
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          }  w-full h-auto bg-gray-200 dark:bg-slate-900 absolute top-[9vh] left-0 right-0 z-50 flex flex-col justify-start items-start`}
        >
          <div className="w-full flex flex-col  items-center relative">
            <input
              className="  xs:w-[100%] sm:w-[80%] md:w-[80%] xl:w-[50%] h-[50px] pl-10 rounded-xl border border-rose-400 dark:bg-slate-700"
              type="text"
              placeholder={t("Search")}
              value={searchQuery}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full h-[auto] flex flex-col xl:flex-row items-start justify-start p-2">
            <div className="w-[100%] h-[auto] flex justify-around items-center gap-3 ">
              <SignInButton
                className="mt-2"
                onLoginSuccess={redirectToProfile}
              />
              <ToggleDarkMode className="darkToggle" />
            </div>

            <div className="w-[100%] h-[auto] flex justify-around items-center gap-3 mt-2">
              <NavigationButton />

              <CartButton className="mt-2" cartItems={cartItems} />
            </div>
          </div>
          {showResults && menuOpen && (
            <div
              ref={searchResultsRef}
              className="search-results rounded-xl dark:bg-slate-700 "
            >
              {loading ? (
                <div className="rounded-xl"></div>
              ) : (
                <div className="w-[100%] h-[auto] flex pl-4 pr-4 pb-2 dark:bg-slate-700  ">
                  <ul className="w-[100%] flex flex-col">
                    {searchResults.map((product) => (
                      <Link to={`/product/${product.id}`} key={product.id}>
                        <li
                          className="w-[100%] p-3 mt-2 cursor-pointer dark:bg-slate-600 bg-gray-100 rounded-xl dark:text-white flex"
                          onClick={() => handleProductClick(product.id)}
                        >
                          <img
                            src={product.image}
                            className="w-[25px] h-[25px]"
                            alt="image"
                          />
                          {product.title} - {product.price} ₾
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Header;
