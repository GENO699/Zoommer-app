import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function NavigationButton() {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/product-category"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleCategorySelect = (categoryName) => {
    if (categoryName === "ყველა") {
      navigate(`/products`);
    } else {
      navigate(`/products?categoryName=${encodeURIComponent(categoryName)}`);
    }
    setShowDropdown(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        className="w-[130px] h-[40px] rounded-xl font-semibold text-md flex justify-center items-center text-white pr-2 bg-orange-500 dark:bg-slate-700"
        onClick={toggleDropdown}
      >
        <FontAwesomeIcon className="text-xs p-2" icon={faBars} />{" "}
        {t("navigationText")}
      </button>
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="dropdown-menu dark:bg-slate-700 dark:text-white"
        >
          <ul>
            <li>
              <button onClick={() => handleCategorySelect("ყველა")}>
                ყველა
              </button>
            </li>
            {categories.map((category) => (
              <li key={category.id}>
                <button
                  onClick={() => handleCategorySelect(category.name)}
                  className="text-sm  text-left"
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default NavigationButton;
