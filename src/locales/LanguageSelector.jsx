/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", lang: "English" },
  { code: "ge", lang: "ქართული" },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  useEffect(() => {
    const storedLanguage = localStorage.getItem("i18nextLng");
    const language = languages.find((lang) => lang.code === storedLanguage);
    setSelectedLanguage(language || languages[0]);
  }, []);

  const selectLanguage = (language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
    setTimeout(() => changeLanguage(language.code), 2000);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng).then(() => {
      localStorage.setItem("i18nextLng", lng);
    });
  };

  return (
    <div className="w-[100px] h-[35px] flex justify-center items-center relative bg-white dark:bg-slate-800 dark:border-2 dark:border-white">
      <div
        className="flex gap-1 items-center justify-center cursor-pointer duration-200 px-2 py-1 dark:bg-slate-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lightText ">
          {selectedLanguage ? selectedLanguage.lang : ""}
        </span>
      </div>
      {isOpen && (
        <div className="absolute bottom-full left-0 bg-white divide-y divide-gray-100 rounded-lg shadow  ">
          <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-white dark:bg-slate-800 ">
            {languages.map((language) => (
              <li key={language.code}>
                <div className="flex items-center">
                  <input
                    id={`default-radio-${language.code}`}
                    type="radio"
                    value={language.code}
                    name="default-radio"
                    className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500`}
                    onChange={() => selectLanguage(language)}
                    checked={selectedLanguage.code === language.code}
                  />
                  <label
                    htmlFor={`default-radio-${language.code}`}
                    className="uppercase ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    {language.lang}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
