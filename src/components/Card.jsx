/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { BsCart2, BsHeart, BsHeartFill } from "react-icons/bs"; // Import heart icons
import Comparison from "./Comparison";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Card({ selectedCategoryName, minPrice, maxPrice, products }) {
  const { t } = useTranslation();
  const [likedProducts, setLikedProducts] = useState([]);

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

  return (
    <div className="grid w-4/5 grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 mx-auto">
      {products && products.length > 0 ? (
        products.map((product) => (
          <div
            key={product.id}
            className="cursor-pointer relative w-full sm:w-auto h-[350px] flex flex-col justify-center items-center mt-5  p-4"
          >
            <Link
              to={`/product/${product.id}`}
              className="product-link cursor-pointer relative w-full sm:w-auto h-[350px] flex flex-col justify-center items-center mt-5 card p-4 "
            >
              <div className="w-full h-auto flex flex-col justify-center items-center">
                {/* Heart button */}
                <Link to={"/wishlist"}>
                  <button
                    className="absolute top-2 right-2 text-red-500"
                    onClick={() => toggleLike(product.id)}
                  >
                    {/* Render filled heart icon if product is liked, otherwise outline heart icon */}
                    {likedProducts.includes(product.id) ? (
                      <BsHeartFill />
                    ) : (
                      <BsHeart />
                    )}
                  </button>
                </Link>

                <img
                  className="w-full h-[130px] object-contain"
                  src={product.image}
                  alt={product.title}
                />
                <div className="w-full h-auto pl-2 flex justify-start items-center gap-3 mt-3">
                  <h1 className="text-orange-500 font-bold">{product.title}</h1>

                  <h1 className="text-md  text-black dark:text-white">
                    {product.price} ₾{product.salePrice}
                  </h1>
                </div>
                <div className="w-full pl-2 flex flex-col justify-start items-start">
                  <div className="h-[50px] overflow-hidden">
                    <h1 className="text-xs font-semibold mt-2">
                      {product.description}
                    </h1>
                  </div>
                  <div className="w-full flex justify-around items-end gap-3 mt-4">
                    <Comparison />
                    <button
                      className="w-full sm:w-[200px] h-[40px] flex justify-center items-center gap-2 text-[13px] bg-orange-400 rounded-md font-semibold dark:bg-slate-700"
                      onClick={(event) => addToCartHandler(product.id, event)}
                    >
                      <BsCart2 /> {t("AddToCart")}
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
}

export default Card;
