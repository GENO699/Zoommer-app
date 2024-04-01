import { useState, useEffect } from "react";
import useLocalStorage from "use-local-storage";
import { IoSunnySharp } from "react-icons/io5";

import { IoIosMoon } from "react-icons/io";

const ToggleDarkMode = () => {
  const [isDarkMode, setDarkMode] = useLocalStorage("isDark", false);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (isDarkMode) {
      root.classList.add("dark");
      body.classList.add("dark");
    } else {
      root.classList.remove("dark");
      body.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className="flex justify-end items-center w-[auto]">
      <button
        className="p-2 rounded-xl text-lg bg-white text-black w-[100px] h-[45px] flex justify-center items-center  font-semibold dark:bg-slate-700  dark:text-white"
        onClick={toggleDarkMode}
      >
        {isDarkMode ? <IoSunnySharp size={24} /> : <IoIosMoon size={24} />}
      </button>
    </div>
  );
};

export default ToggleDarkMode;
