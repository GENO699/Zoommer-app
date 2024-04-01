/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function PopdownCartOpenButton() {
  const { t } = useTranslation();
  return (
    <div>
      <Link to={"/cart"}>
        <button className="w-[170px] h-[42px] text-white rounded-xl text-center bg-orange-500 font-bold text-sm ">
          {t("OpenCart")}
        </button>
      </Link>
    </div>
  );
}

export default PopdownCartOpenButton;
