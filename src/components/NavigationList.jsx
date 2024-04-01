/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Slider from "../components/Carousel";

function NavigationList() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/product-category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleSelectCategory = (name) => {
    if (name === "ყველა") {
      navigate("/products");
    } else {
      navigate(`/products?categoryName=${encodeURIComponent(name)}`);
    }
  };

  return (
    <div className="w-full h-[auto] flex justify-center items-center mt-16 ">
      <div className="w-11/12 lg:w-[80%] h-auto flex flex-col lg:flex-row justify-between items-center">
        <div className="w-full lg:w-[23%] h-[auto] text-md flex flex-col justify-center items-center  font-semibold p-3 mt-12 border-none rounded-2xl text-gray-600 dark:bg-slate-700 dark:text-white shadow-md">
          {categories.map((category) => (
            <button
              key={category.id}
              className="w-full h-[45px] pb-2 pt-2 lg:h-auto bg-white flex justify-start  border-b-2 border-b-gray-100 dark:bg-slate-700 dark:text-white pl-4 items-center gap-4 mt-3 hover:bg-gray-200 dark:hover:bg-gray-800"
              onClick={() => handleSelectCategory(category.name)}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className="w-full lg:w-[76%] h-[42vh] lg:mt-7">
          <Slider />
        </div>
      </div>
    </div>
  );
}

export default NavigationList;
