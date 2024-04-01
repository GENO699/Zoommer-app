/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { BsCart2, BsHeart, BsHeartFill } from "react-icons/bs"; // Import heart icons
import Comparison from "./Comparison";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function MainCardScroll({ category }) {
  const scrollRef = useRef(null);
  const productRef = useRef(null);
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [likedProducts, setLikedProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/product?page=1&pageSize=60&sales=true`
        );

        if (Array.isArray(response.data.products)) {
          const filteredProducts = response.data.products.filter(
            (product) => product.category_name === category
          );
          setProducts(filteredProducts);
        } else {
          console.error(
            "Response data products is not an array:",
            response.data.products
          );
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [category]);

  useEffect(() => {
    const updateContainerWidth = () => {
      if (scrollRef.current) {
        setContainerWidth(scrollRef.current.offsetWidth);
      }
    };

    updateContainerWidth();

    window.addEventListener("resize", updateContainerWidth);

    return () => {
      window.removeEventListener("resize", updateContainerWidth);
    };
  }, []);

  const toggleLike = async (productId) => {
    try {
      const token = localStorage.getItem("access_token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const updatedLikedProducts = likedProducts.includes(productId)
        ? likedProducts.filter((id) => id !== productId)
        : [...likedProducts, productId];

      setLikedProducts(updatedLikedProducts);

      await axios.post(
        "http://localhost:3000/liked-products",
        { product_id: productId },
        config
      );
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const addToCartHandler = async (productId, event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("access_token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(
        "http://localhost:3000/cart",
        { product_id: productId },
        config
      );

      alert("Product added to cart successfully!");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Failed to add product to cart. Please try again.");
    }
  };

  const scrollRight = () => {
    const container = scrollRef.current;
    const newPosition = scrollPosition + productRef.current.offsetWidth;
    if (newPosition <= container.scrollWidth - containerWidth) {
      container.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    }
  };

  const scrollLeft = () => {
    const container = scrollRef.current;
    const newPosition = scrollPosition - productRef.current.offsetWidth;
    if (newPosition >= 0) {
      container.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    }
  };

  return (
    <div className="w-full h-auto mt-12 flex justify-center items-center flex-col relative">
      <h1 className="text-left w-[80%] text-xl font-bold mb-4">{category}</h1>
      <div
        className="relative w-full max-w-[90%] h-[62vh] overflow-x-hidden overflow-y-hidden"
        style={{ msOverflowStyle: "none" }}
      >
        <div className="flex items-center justify-between">
          <button
            onClick={scrollLeft}
            className="w-10 h-10 rounded-full border border-solid bg-gray-100 dark:bg-gray-800 dark:border-gray-800 flex justify-center items-center"
          >
            {"<"}
          </button>
          <div
            className="flex items-center"
            ref={scrollRef}
            style={{
              flex: "1",
              overflowX: "auto",
              overflowY: "hidden",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <div
              className="flex items-center"
              style={{
                flex: "0 0 auto",
                minWidth: "100%",
                transition: "transform 0.3s ease-in-out",
              }}
            >
              {products.map((product, index) => (
                <div
                  key={index}
                  ref={productRef}
                  className="cursor-pointer w-[80%] sm:w-[300px] flex flex-col justify-center items-center mt-5 p-4 h-[400px] relative"
                >
                  <Link
                    to={`/product/${product.id}`}
                    className="w-full sm:w-full h-[350px] flex flex-col justify-center items-center mt-5 p-4 card relative dark:bg-slate-900"
                    style={{ position: "relative" }}
                  >
                    <button
                      className="absolute top-2 right-2 text-red-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(product.id);
                      }}
                    >
                      {likedProducts.includes(product.id) ? (
                        <BsHeartFill />
                      ) : (
                        <BsHeart className="text-xl" />
                      )}
                    </button>
                    <img
                      className="w-full h-[100px] object-contain"
                      src={product.image}
                      alt={product.title}
                    />
                    <div className="w-full h-auto pl-2 flex flex-col justify-start items-start gap-3 mt-3">
                      <h1 className="text-orange-500 font-bold">
                        {product.title}
                      </h1>
                      <h1 className="text-md text-black dark:text-white font-bold">
                        {product.price} ₾
                      </h1>
                    </div>
                    <div className="w-full pl-2 flex flex-col justify-start items-start">
                      <div className="w-full h-[8vh] flex justify-around items-end gap-3 mt-4 ">
                        <Comparison />
                        <button
                          className="w-full sm:w-[200px] h-[40px] flex justify-center items-center gap-2 text-[13px]  bg-orange-400 rounded-md font-semibold dark:bg-slate-700"
                          onClick={(event) =>
                            addToCartHandler(product.id, event)
                          }
                        >
                          <BsCart2 /> {t("AddToCart")}
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={scrollRight}
            className="w-10 h-10 rounded-full border border-solid bg-gray-100 dark:bg-gray-800 dark:border-gray-800 flex justify-center items-center"
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainCardScroll;
