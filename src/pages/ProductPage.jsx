/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";

function ProductPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    setLoading(true);
    const pathname = location.pathname;
    const productId = pathname.substring(pathname.lastIndexOf("/") + 1);
    try {
      const response = await axios.get(
        `http://localhost:3000/product/${productId}`
      );
      setProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
      setLoading(false);
    }
  };

  const addToCartHandler = async () => {
    try {
      if (!product) return;

      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("Authentication token is missing");

        return;
      }

      const response = await axios.post(
        "http://localhost:3000/cart",
        { product_id: String(product.id) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Product added to cart:", response.data);
      // Optionally, you can navigate the user to the cart page or display a success message
      navigate("/cart"); // Navigate to the cart page after adding the product
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-bold">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-orange-500 h-24 w-24"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-bold">
        Loading...
      </div>
    );
  }

  const { image, title, description, price, salePrice } = product;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 dark:bg-slate-800">
      <Header />

      <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-between py-16 mt-10 ">
        {/* Product Information Section */}
        <div className="w-full lg:w-1/2 max-w-lg mx-auto mb-8 lg:mb-0 ">
          <div className="bg-white p-8 rounded-lg shadow-md dark:bg-slate-800 dark:border-2 dark:border-white">
            <img
              src={image}
              alt={title}
              className="w-full h-auto rounded-lg mb-4"
            />
            <h1 className="text-2xl font-bold mb-4">{title}</h1>
            <p className="text-gray-700 mb-6 dark:text-white">{description}</p>
            {salePrice ? (
              <div className="flex items-center mb-4">
                <p className="text-gray-500 line-through mr-2">{price} ₾</p>
                <p className="text-red-500 font-bold">{salePrice} ₾</p>
              </div>
            ) : (
              <p className="text-3xl font-semibold">{price} ₾</p>
            )}
          </div>
        </div>
        <div className="w-full lg:w-1/2 ">
          <div className="bg-white p-8 rounded-lg shadow-md dark:bg-slate-800 dark:border-2 dark:border-white">
            <h2 className="text-3xl w-[100%] text-center font-bold mb-4">
              Add to Cart
            </h2>
            <button
              onClick={addToCartHandler}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full uppercase tracking-wide w-full"
            >
              {t("AddToCart2")}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductPage;
