/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";

function PurchasedProducts() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    fetchPurchasedProducts();
  }, []);

  const fetchPurchasedProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/purchases");
      setPurchases(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching purchased products:", error);
      setLoading(false);
    }
  };

  const cancelPurchase = async (purchaseId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/purchases/${purchaseId}`
      );
      console.log("Purchase cancelled successfully:", response.data);
      fetchPurchasedProducts();
    } catch (error) {
      console.error("Error cancelling purchase:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <h1 className="text-3xl font-semibold mb-4 dark:text-white mt-16">
        {t("PurchasedProducts")}
      </h1>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-orange-500 h-24 w-24"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {purchases.map((purchase) => (
            <div
              key={purchase.id}
              className="border border-gray-200 p-4 rounded-md shadow-md"
            >
              <h2 className="text-xl font-semibold mb-2">
                {t("ProductID")} {purchase.id}
              </h2>
              <p className="text-gray-600 dark:text-white">
                {t("fullPrice")}: {purchase.totalPrice}₾
              </p>
              <p className="text-gray-600 dark:text-white">
                {t("TotalQuentity")}: {purchase.totalItems}
              </p>
              <h3 className="text-lg font-semibold mt-4">
                Purchased Products:
              </h3>
              <ul className="list-disc list-inside mt-2">
                {purchase.products?.map((product) => (
                  <li key={product.id} className="text-gray-600">
                    {product.title} - {product.price}₾
                  </li>
                ))}
              </ul>
              <button
                className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
                onClick={() => cancelPurchase(purchase.id)}
              >
                {t("PurchaseCancel")}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PurchasedProducts;
