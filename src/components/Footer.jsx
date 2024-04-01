/* eslint-disable no-unused-vars */
import React from "react";
import Facebook from "../images/fb.svg";
import Youtube from "../images/youtube.svg";
import Instagram from "../images/instagram.svg";
import Tiktok from "../images/tiktok.svg";
import Gmail from "../images/gmail.svg";
import Phone from "../images/phone.svg";
import Location from "../images/locations.svg";
import ecommerce from "../images/e-360.svg";
import LanguageSelector from "../locales/LanguageSelector";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <div className="w-full h-auto flex flex-col justify-center items-center bg-gray-200 dark:bg-slate-900 text-sm p-2 font-semibold mt-10">
      <div className="w-full max-w-screen-lg flex flex-col md:flex-row justify-between items-start p-4">
        <div className="w-full md:w-1/4 flex flex-col">
          <h1 className="mb-2 border-b-2 border-orange-500">
            {t("navigationText")}
          </h1>
          <a href="#" className="my-2 dark:text-white">
            {t("About")}
          </a>
          <a href="#" className="my-2 dark:text-white">
            {t("Rules")}
          </a>
          <a href="#" className="my-2 dark:text-white">
            {t("Corporate")}
          </a>
          <a href="#" className="my-2 dark:text-white">
            {t("Delivery")}
          </a>
          <a href="#" className="my-2 dark:text-white">
            {t("Career")}
          </a>
          <a href="#" className="my-2 dark:text-white">
            Trade in
          </a>
        </div>

        <div className="w-full md:w-1/4 flex flex-col">
          <h1 className="mb-2 border-b-2 border-orange-500">{t("Payments")}</h1>
          <a href="#" className="my-2 dark:text-white">
            {t("PaymentMethods")}
          </a>
          <a href="#" className="my-2 dark:text-white">
            {t("Warranty")}
          </a>
          <a href="#" className="my-2 dark:text-white">
            {t("Installments")}
          </a>
          <a href="#" className="my-2 dark:text-white">
            {t("ProductReturns")}
          </a>
        </div>

        <div className="w-full md:w-1/4 flex flex-col">
          <h1 className="mb-2 border-b-2 border-orange-500">{t("FollowUs")}</h1>
          <div className="flex flex-col md:flex-row items-center">
            <img
              className="my-2 mx-2 h-6 w-6"
              src={Facebook}
              alt="Facebook Logo"
            />
            <a href="#" className="my-2 dark:text-white">
              Facebook
            </a>
          </div>
          <div className="flex flex-col md:flex-row items-center">
            <img
              className="my-2 mx-2 h-6 w-6"
              src={Youtube}
              alt="Facebook Logo"
            />
            <a href="#" className="my-2 dark:text-white">
              Youtube
            </a>
          </div>
          <div className="flex flex-col md:flex-row items-center">
            <img
              className="my-2 mx-2 h-6 w-6"
              src={Instagram}
              alt="Facebook Logo"
            />
            <a href="#" className="my-2 dark:text-white">
              Instagram
            </a>
          </div>
          <div className="flex flex-col md:flex-row items-center">
            <img
              className="my-2 mx-2 h-6 w-6"
              src={Tiktok}
              alt="Facebook Logo"
            />
            <a href="#" className="my-2 dark:text-white">
              Tik Tok
            </a>
          </div>
        </div>

        <div className="w-full md:w-1/4 flex flex-col">
          <h1 className="mb-2 border-b-2 border-orange-500">{t("Contacts")}</h1>
          <div className="flex flex-col md:flex-row items-center">
            <img
              className="my-2 mx-2 h-6 w-6"
              src={Gmail}
              alt="Facebook Logo"
            />
            <a href="#" className="my-2 dark:text-white">
              Info@zoommer.ge
            </a>
          </div>
          <div className="flex flex-col md:flex-row items-center">
            <img
              className="my-2 mx-2 h-6 w-6"
              src={Phone}
              alt="Facebook Logo"
            />
            <a href="#" className="my-2 dark:text-white">
              +995 (32) 2 60 30 60 / *7007
            </a>
          </div>
          <div className="flex flex-col md:flex-row items-center">
            <img
              className="my-2 mx-2 h-6 w-6"
              src={Location}
              alt="Facebook Logo"
            />
            <a href="#" className="my-2 dark:text-white">
              {t("Branches")}
            </a>
          </div>
          <h1 className="my-2">{t("Zoommer App")}</h1>
        </div>

        <div className="w-full md:w-1/4 flex justify-center items-center">
          <img src={ecommerce} alt="e-commerce logo" />
        </div>
      </div>

      <div className="w-full max-w-screen-lg flex gap-2 justify-center items-center p-4 border-t-4 border-white bg-slate-200 dark:bg-slate-900">
        <h1 className="text-center text-slate-400">
          Copyright © 2023 Zoommer.ge. All rights reserved.
        </h1>
        <LanguageSelector />
      </div>
    </div>
  );
}

export default Footer;
