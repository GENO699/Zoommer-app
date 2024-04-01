/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes
import { BsCart2 } from "react-icons/bs";
import EmptyCartImage from "../images/emptybag.svg";
import PopdownCartOpenButton from "./PopdownCartOpenButton";
import { useTranslation } from "react-i18next";
import { RiDeleteBinLine } from "react-icons/ri";

function CartButton({ cartItems }) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMouseInMenu, setIsMouseInMenu] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const dropdownRef = useRef(null);

  useEffect(() => {
    let quantity = 0;
    let price = 0;
    cartItems.forEach((item) => {
      quantity += item.count;
      price += item.cartProduct.price * item.count;
    });
    setTotalQuantity(quantity);

    setTotalPrice(price + 5);
  }, [cartItems]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (!isMouseInMenu) {
      setTimeout(() => {
        setIsOpen(false);
      }, 200);
    }
  };

  const handleMenuMouseEnter = () => {
    setIsMouseInMenu(true);
  };

  const handleMenuMouseLeave = () => {
    setIsMouseInMenu(false);
  };

  const removeFromCartHandler = async (productId) => {
    try {
      const token = localStorage.getItem("access_token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const url = `http://localhost:3000/cart/${productId}`;
      await axios.delete(url, config);

      const updatedCartItems = cartItems.filter(
        (item) => item.productId !== productId
      );
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  return (
    <div className="relative" onMouseLeave={handleMouseLeave}>
      <Link to={"/cart"}>
        <button
          onMouseEnter={handleMouseEnter}
          className="flex justify-center items-center w-[140px] h-[45px] rounded-xl p-2 font-semibold bg-white dark:bg-slate-700 dark:text-white relative"
        >
          <BsCart2 className="text-2xl pr-1" />
          {t("cartButtonText")}
          {totalQuantity > 0 && (
            <span className="bg-red-500  w-[23px] h-[23px] text-center flex justify-center items-center text-white text-xs absolute -top-2 -right-2 px-2 rounded-full">
              {totalQuantity}
            </span>
          )}
        </button>
      </Link>

      {isOpen && (
        <div
          ref={dropdownRef}
          onMouseEnter={handleMenuMouseEnter}
          onMouseLeave={handleMenuMouseLeave}
          className="w-100 absolute left-1 mt-2 bg-white dark:bg-slate-700 border border-gray-300 rounded-2xl border-none shadow-lg z-10"
          style={{ maxHeight: "400px", overflowY: "hidden" }}
        >
          <div>
            <div
              className="w-[350px] h-[auto] rounded-xl p-4"
              style={{ overflowY: "auto", maxHeight: "200px" }}
            >
              {cartItems.length === 0 ? (
                <div className="flex justify-center flex-col items-center p-4">
                  <div className="w-[100%] h-[auto] flex justify-between items-center">
                    <h1 className="text-sm font-bold">{t("Cart")}</h1>
                    <h1 className="text-xs text-gray-500 font-semibold dark:text-white">
                      0 {t("product")}
                    </h1>
                  </div>
                  <div className="w-[100%] flex justify-end items-end">
                    <img src={EmptyCartImage} alt={EmptyCartImage} />
                  </div>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className=" w-[100%] flex justify-between items-center  border-b border-gray-200 bg-gray-100 p-4 rounded-xl mt-3 dark:bg-slate-700 dark:border-2 dark:border-white"
                  >
                    <div>
                      <h1 className="text-sm font-semibold">
                        {item.cartProduct.title}
                      </h1>
                      <p className="text-xs text-gray-500">
                        Price: {item.cartProduct.price}
                      </p>
                    </div>
                    <img
                      src={item.cartProduct.image}
                      alt={item.cartProduct.title}
                      className="w-10 h-10 object-contain"
                    />
                    <button onClick={() => removeFromCartHandler(item.id)}>
                      <RiDeleteBinLine />
                    </button>{" "}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="w-[100%] h-[auto] flex justify-between items-center p-4">
            <h1 className="text-sm font-bold">
              {t("product")}: {totalQuantity}
            </h1>
            <h1 className="text-sm font-bold">
              {t("fullPrice")}: {totalPrice}₾
            </h1>
          </div>

          <div className="w-[100%] h-[9vh] flex justify-center items-center ">
            <PopdownCartOpenButton />
          </div>
        </div>
      )}
    </div>
  );
}

CartButton.propTypes = {
  cartItems: PropTypes.array.isRequired,
};

export default CartButton;
