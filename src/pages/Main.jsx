import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MainCardScroll from "../components/MainCardScroll";
import NavigationList from "../components/NavigationList";
import SaleCardScroll from "../components/SaleScroll";

function Main() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-orange-500 h-24 w-24"></div>
      </div>
    );
  }

  return (
    <div className="h-[auto]">
      <Header />
      <NavigationList />
      <SaleCardScroll />
      <MainCardScroll category="ლეპტოპები" />
      <MainCardScroll category="სმარტფონები" />
      <MainCardScroll category="აუდიო" />
      <MainCardScroll category="ფოტო | ვიდეო" />
      <MainCardScroll category="გეიმინგი" />
      <MainCardScroll category="TV | მონიტორები" />
      <Footer />
    </div>
  );
}

export default Main;
