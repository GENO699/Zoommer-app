import React, { useState, useEffect } from "react";
import axios from "axios";
import EmptyCartImage from "../images/emptybag.svg";
import Header from "../components/Header";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Cart() {
  const [cart, setCart] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState("");
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = () => {
    setLoading(true);
    axios
      .get("http://localhost:3000/cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        setCart(response.data);
        calculateTotals(response.data);
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
        setLoading(false);
      });
  };

  function calculateTotals(cartData) {
    let totalQuantity = 0;

    cartData.forEach((item) => {
      totalQuantity += item.count;
    });

    setTotalQuantity(totalQuantity.toString());
  }

  const removeFromCartHandler = async (productId) => {
    try {
      const token = localStorage.getItem("access_token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const url = `http://localhost:3000/cart/${productId}`;
      const response = await axios.delete(url, config);

      if (response.status === 200) {
        console.log("Product successfully removed from cart.");
        fetchCart();
      } else {
        console.error("Failed to remove product from cart:", response.data);
      }
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  const removeAllProductsFromCart = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await Promise.all(
        cart.map(async (item) => {
          const url = `http://localhost:3000/cart/${item.id}`;
          await axios.delete(url, config);
        })
      );

      setCart([]);
      setTotalQuantity("0");

      console.log("All products successfully removed from cart.");
    } catch (error) {
      console.error("Error removing all products from cart:", error);
    }
  };

  const handlePurchase = () => {
    navigate("/Card", { state: { cart } });
  };

  const calculateItemPrice = (item) => {
    return (item.cartProduct.salePrice || item.cartProduct.price) * item.count;
  };

  const calculateTotalPrice = (cartData) => {
    return cartData.reduce(
      (total, item) => total + calculateItemPrice(item),
      0
    );
  };

  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      <Header />
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-orange-500 h-24 w-24"></div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto mt-8 h-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center border-b-2 border-gray-200 pb-4 mb-4">
            <h1 className="text-2xl font-bold mb-4 sm:mb-0">
              {t("CartCount", { totalQuantity })}
            </h1>
            <div className="flex items-center space-x-4">
              <Link to="/purchased">
                <button className="btn">{t("PurchasedProducts")}</button>
              </Link>
              <Link to="/wishlist">
                <button className="btn">{t("LikedProducts")}</button>
              </Link>
              <button
                onClick={removeAllProductsFromCart}
                className="text-gray-500 text-sm font-bold flex items-center space-x-2"
              >
                <RiDeleteBinLine className="text-lg" />
                <span>{t("DeleteAll")}</span>
              </button>
            </div>
          </div>

          {cart.length === 0 ? (
            <img src={EmptyCartImage} className="mx-auto" alt="Cart Image" />
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.cartProduct.id}
                  className="flex flex-col sm:flex-row justify-between items-center border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      className="w-16 h-16 rounded-lg object-contain"
                      src={item.cartProduct.image}
                      alt={item.cartProduct.title}
                    />
                    <span className="text-sm">{item.cartProduct.title}</span>
                  </div>
                  <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                    <span className="text-sm text-orange-500">
                      {item.cartProduct.salePrice || item.cartProduct.price} ₾
                    </span>
                    <span className="text-red">{item.count}</span>
                    <button
                      onClick={() => removeFromCartHandler(item.id)}
                      className="text-red hover:text-red-500 focus:outline-none"
                    >
                      <RiDeleteBinLine />
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex flex-col sm:flex-row justify-between items-center border-t border-gray-200 pt-4">
                <h1 className="text-lg font-bold">{t("fullPrice")}</h1>
                <p className="font-bold text-black">
                  {calculateTotalPrice(cart)} ₾
                </p>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <h1 className="text-lg font-bold">{t("Delivery")}</h1>
                <p className="font-bold text-black">5 ₾</p>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center border-t border-gray-200 pt-4">
                <h1 className="text-lg font-bold">{t("PaymentAmount")}</h1>
                <p className="font-bold text-orange-500">
                  {parseFloat(calculateTotalPrice(cart)) + 5} ₾
                </p>
              </div>
              <div className="w-full flex justify-center items-center mt-6">
                <div className="w-80">
                  <button
                    onClick={handlePurchase}
                    className="w-full py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 focus:outline-none"
                  >
                    {t("Purchase")}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Cart;
