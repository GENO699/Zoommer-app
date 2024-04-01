import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsX } from "react-icons/bs";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";

const Wishlist = () => {
  const [likedProducts, setLikedProducts] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    fetchLikedProducts();
  }, []);

  const fetchLikedProducts = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        "http://localhost:3000/liked-products",
        config
      );
      setLikedProducts(response.data);
    } catch (error) {
      console.error("Error fetching liked products:", error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const token = localStorage.getItem("access_token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(
        `http://localhost:3000/liked-products/${productId}`,
        config
      );

      fetchLikedProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleLike = async (productId) => {
    if (likedProducts.some((product) => product.id === productId)) {
      return;
    }

    try {
      const token = localStorage.getItem("access_token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(
        "http://localhost:3000/liked-products",
        { product_id: productId },
        config
      );

      // Add the new liked product to the likedProducts array
      setLikedProducts((prevLikedProducts) => [
        ...prevLikedProducts,
        { id: productId },
      ]);
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
    }
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <Header />
      <h1 className="text-3xl font-semibold mt-24 text-center">
        {t("LikedProducts")}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
        {likedProducts.map((product) => (
          <div
            key={product.id}
            className="w-full flex flex-col bg-white shadow-md rounded-lg overflow-hidden dark:bg-slate-900 dark:text-white"
          >
            <div className="relative">
              <button
                onClick={() => handleDelete(product.id)}
                className="absolute top-2 right-2 bg-transparent border-none outline-none text-gray-600 hover:text-red-500"
              >
                <BsX className="text-2xl" />
              </button>
              <div className="w-full h-[auto] flex justify-center items-center">
                <img
                  src={product.likedProduct.image}
                  alt={product.likedProduct.title}
                  className="w-[230px] h-[220px] object-center"
                />
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">
                {product.likedProduct.title}
              </h2>
              <p
                className="text-gray-600 mb-2 overflow-hidden dark:text-white"
                style={{ textOverflow: "ellipsis", whiteSpace: "nowrap" }}
              >
                {product.likedProduct.description}
              </p>
              <p className="text-gray-700 font-semibold dark:text-white">
                {product.likedProduct.salePrice ? (
                  <>
                    <span className="text-red-500">
                      {product.likedProduct.salePrice} ₾
                    </span>{" "}
                    ({t("Sale")})
                  </>
                ) : (
                  <>Price: {product.likedProduct.price} ₾</>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
