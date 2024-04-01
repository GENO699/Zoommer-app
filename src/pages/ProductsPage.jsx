import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BsCart2, BsHeart, BsHeartFill } from "react-icons/bs";
import { useTranslation } from "react-i18next";

const ProductsPage = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true); // Loading state
  const [categories, setCategories] = useState([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [onlySales, setOnlySales] = useState(false);
  const [numColumns, setNumColumns] = useState(3);
  const [likedProducts, setLikedProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchCategories();
    const params = new URLSearchParams(location.search);
    const categoryName = params.get("categoryName");
    setSelectedCategoryName(categoryName || "ყველა");
  }, [location]);

  useEffect(() => {
    fetchFilteredProducts(selectedCategoryName, minPrice, maxPrice, onlySales);
  }, [selectedCategoryName, minPrice, maxPrice, onlySales]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setNumColumns(1);
      } else if (window.innerWidth < 1024) {
        setNumColumns(2);
      } else {
        setNumColumns(3);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/product-category"
      );
      setCategories(response.data);
      setLoading(false); // Stop loading after fetching data
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchFilteredProducts = async (
    categoryName,
    minPrice,
    maxPrice,
    onlySales,
    pageSize
  ) => {
    try {
      let url = "http://localhost:3000/product";

      // Construct query parameters
      const params = new URLSearchParams();
      if (categoryName && categoryName !== "ყველა") {
        params.append("categoryName", categoryName);
      }
      if (minPrice !== "") {
        params.append("minPrice", minPrice);
      }
      if (maxPrice !== "") {
        params.append("maxPrice", maxPrice);
      }
      if (onlySales) {
        params.append("onlySales", "true");
      }

      if (categoryName === "ყველა") {
        params.append("page", "1");
        params.append("pageSize", "9999");
      }

      const response = await axios.get(url, { params });

      setFilteredProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleSelectCategory = (name) => {
    setSelectedCategoryName(name);
    navigate(
      `/products${
        name === "ყველა" ? "" : `?categoryName=${encodeURIComponent(name)}`
      }`
    );
  };

  const toggleOnlySales = () => {
    setOnlySales(!onlySales);
  };

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-orange-500 h-24 w-24"></div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/5 bg-gray-200 p-4 dark:bg-slate-700">
        <Header />

        <div className="mt-8 dark:bg-slate-700">
          <h2 className="text-lg font-semibold mb-2">Categories</h2>
          <ul>
            <li>
              <button
                className={`w-full pl-2 py-2 border-b border-gray-300 text-left font-semibold ${
                  selectedCategoryName === "ყველა"
                    ? "bg-gray-300 font-semibold"
                    : ""
                }`}
                onClick={() => handleSelectCategory("ყველა")}
              >
                ყველა
              </button>
            </li>
            {categories.map((category) => (
              <li key={category.id}>
                <button
                  className={`w-full pl-2 py-2 border-b border-gray-300 text-left categories font-semibold ${
                    selectedCategoryName === category.name
                      ? "bg-gray-300   dark:text-black"
                      : ""
                  }`}
                  onClick={() => handleSelectCategory(category.name)}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">{t("PriceRange")}</h2>
          <div className="flex flex-wrap">
            <input
              type="text"
              placeholder="Min Price"
              value={minPrice}
              onChange={handleMinPriceChange}
              className="w-full md:w-1/2 mr-2 mb-2 md:mb-0 p-2 border border-gray-300 dark:bg-slate-700"
            />
            <input
              type="text"
              placeholder="Max Price"
              value={maxPrice}
              onChange={handleMaxPriceChange}
              className="w-full md:w-1/2 p-2 border border-gray-300 dark:bg-slate-700 mt-3"
            />
          </div>
        </div>
        <div className="mt-8">
          <label className="block mb-2">
            <input
              type="checkbox"
              checked={onlySales}
              onChange={toggleOnlySales}
              className="mr-1 dark:bg-slate-700"
            />
            {t("SaleProducts")}
          </label>
        </div>
      </div>

      <div className="w-full p-4 mt-20">
        <div className={`grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1`}>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border border-gray-300 p-2 mb-2 lg:mb-4"
              style={{
                width: "calc(100% - 10px)",
                overflow: "hidden",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                borderRadius: "5px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 4px 8px rgba(0, 0, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <Link
                to={`/product/${product.id}`}
                className="product-link cursor-pointer"
              >
                <div className="w-full flex justify-center items-center">
                  <img
                    src={product.image}
                    alt=""
                    className="w-[210px] h-[200px]"
                  />
                </div>
                <h3 className="text-base font-semibold mt-2">
                  {product.title}
                </h3>
                <p
                  className="text-gray-600 overflow-hidden dark:text-white mt-2"
                  style={{ maxHeight: "50px" }}
                >
                  {product.description}
                </p>
                <p className="text-gray-800 font-semibold">
                  {t("Price")}: {product.price} ₾
                  {product.salePrice && (
                    <>
                      {" "}
                      <span className="text-red-500">
                        {product.salePrice} ₾
                      </span>{" "}
                      ({t("Sale")})
                    </>
                  )}
                </p>
              </Link>
              <div className="flex justify-between items-center mt-4">
                <button
                  className="text-red-500"
                  onClick={() => toggleLike(product.id)}
                >
                  {likedProducts.includes(product.id) ? (
                    <BsHeartFill />
                  ) : (
                    <BsHeart className="text-xl" />
                  )}
                </button>
                <button
                  className="w-[150px] h-[45px] flex justify-center items-center gap-2 text-[13px] bg-orange-400 rounded-md font-semibold dark:bg-slate-700"
                  onClick={(event) => addToCartHandler(product.id, event)}
                >
                  <BsCart2 className="mr-1" />
                  {t("AddToCart")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
