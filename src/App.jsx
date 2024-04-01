/* eslint-disable no-unused-vars */
// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Cart from "./pages/Cart";
import PayForm from "./pages/PayForm";
import ProfilePage from "./pages/ProfilePage";
import SignInButton from "./components/SignInButton";
// import { CartProvider } from "./components/cartButtonContext";
import PhoneDetail from "./pages/ProductPage";
import ProductsPage from "./pages/ProductsPage";
import Wishlist from "./pages/Wishlist";
import PurchasedProducts from "./pages/PurchasedProducts";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/card" element={<PayForm />} />
          <Route path="/auth" element={<SignInButton />} />
          <Route path="/userprofile" element={<ProfilePage />} />
          <Route path="/product/:id" element={<PhoneDetail />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/purchased" element={<PurchasedProducts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
