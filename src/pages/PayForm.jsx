/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css"; // Importing CSS styles
import Footer from "../components/Footer";

function PayForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [focus, setFocus] = useState("");
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [cardNameError, setCardNameError] = useState(false);
  const [cardNumberError, setCardNumberError] = useState(false);
  const [expiryError, setExpiryError] = useState(false);
  const [cvcError, setCvcError] = useState(false);

  const handlePurchase = async () => {
    try {
      // Check if any field is empty
      if (!cardName || !cardNumber || !expiry || !cvc) {
        setCardNameError(!cardName);
        setCardNumberError(!cardNumber);
        setExpiryError(!expiry);
        setCvcError(!cvc);
        return;
      }

      const { cart } = location.state;
      const totalPrice = calculateTotalPrice(cart);

      const purchaseResponse = await axios.post(
        "http://localhost:3000/purchases",
        {
          totalPrice,
          totalItems: cart.length,
          cardName,
          cardNumber,
          expiry,
          cvc,
        }
      );

      if (purchaseResponse.status === 200) {
        const purchasedProducts = purchaseResponse.data.products;
        setPurchaseSuccess(true);
        navigate("/purchased", { state: { purchasedProducts } });
      }
    } catch (error) {
      console.error("Error making purchase:", error.response.data);
    }
  };

  const calculateTotalPrice = (cart) => {
    let totalPrice = 0;
    cart.forEach((item) => {
      totalPrice += item.cartProduct.price * item.count;
    });
    return totalPrice;
  };

  const handleNameChange = (e) => {
    const value = e.target.value.replace(/[0-9]/g, "");
    setCardName(value);
    setCardNameError(!value);
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setCardNumber(value);
    setCardNumberError(value.length !== 16);
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 4);
    const month = value.slice(0, 2);
    const day = value.slice(2);

    if (parseInt(month, 10) > 12) {
      value = "12" + value.slice(2);
    }
    if (parseInt(day, 10) > 30) {
      value = value.slice(0, 2) + "30";
    }

    if (value.length <= 2) {
      setExpiry(value);
    } else {
      setExpiry(value.slice(0, 2) + "/" + value.slice(2));
    }
    setExpiryError(value.length !== 4);
  };

  const handleCvcChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setCvc(value);
    setCvcError(value.length !== 3);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-700 ">
      <Header />
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg mt-4 md:mt-12 dark:bg-slate-800">
        <h2 className="text-2xl w-[100%] text-center font-semibold mb-4">
          {t("Payment")}
        </h2>
        <div className="mb-4">
          <Cards
            number={cardNumber}
            name={cardName}
            expiry={expiry}
            cvc={cvc}
            focused={focus}
          />
        </div>
        <form className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder={t("CardName")}
              value={cardName}
              onChange={handleNameChange}
              maxLength={50}
              className={`input-field dark:bg-slate-700 ${
                cardNameError ? "border-red-500" : ""
              }`}
            />
            {cardNameError && (
              <p className="text-red-500 text-sm absolute mt-1">
                {t("Please fill this input")}
              </p>
            )}
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder={t("CardNumber")}
              value={cardNumber}
              onChange={handleCardNumberChange}
              onFocus={() => setFocus("number")}
              maxLength={16}
              className={`input-field dark:bg-slate-700 ${
                cardNumberError ? "border-red-500" : ""
              }`}
            />
            {cardNumberError && (
              <p className="text-red-500 text-sm absolute mt-1">
                {t("Please fill this input")}
              </p>
            )}
          </div>
          <div className="flex space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="MM/YY"
                value={expiry}
                onChange={handleExpiryChange}
                onFocus={() => setFocus("expiry")}
                maxLength={5}
                className={`input-field dark:bg-slate-700 ${
                  expiryError ? "border-red-500" : ""
                }`}
              />
              {expiryError && (
                <p className="text-red-500 text-sm absolute mt-1">
                  {t("Please fill this input")}
                </p>
              )}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="CCV"
                value={cvc}
                onChange={handleCvcChange}
                onFocus={() => setFocus("cvc")}
                maxLength={3}
                className={`input-field dark:bg-slate-700 ${
                  cvcError ? "border-red-500" : ""
                }`}
              />
              {cvcError && (
                <p className="text-red-500 text-sm absolute mt-1">
                  {t("Please fill this input")}
                </p>
              )}
            </div>
          </div>
          <div className="w-[100%] flex justify-center items-center mt-4">
            <button
              onClick={handlePurchase}
              className="w-[150px] h-[45px] flex justify-center items-center gap-2 text-[13px] bg-orange-400 rounded-md font-semibold dark:bg-slate-700"
            >
              {t("Purchase")}
            </button>
          </div>
        </form>
        {purchaseSuccess && (
          <p className="text-green-500 mt-4">
            {t("You have successfully purchased the product :)")}
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default PayForm;
