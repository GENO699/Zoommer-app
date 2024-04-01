/* eslint-disable no-unused-vars */
// src/components/LanguageSwitcher.js
import React from "react";
import { useTranslation } from "react-i18next";
import i18n from "../Translations/i18n";

function LanguageSwitcher() {
  const {
    i18n: { language },
  } = useTranslation();

  const changeLanguage = (newLanguage) => {
    i18n.changeLanguage(newLanguage);
  };

  return (
    <div className="language-switcher">
      <button onClick={() => changeLanguage("en")} disabled={language === "en"}>
        English
      </button>
      <button onClick={() => changeLanguage("ka")} disabled={language === "ka"}>
        ქართული
      </button>
    </div>
  );
}

export default LanguageSwitcher;
