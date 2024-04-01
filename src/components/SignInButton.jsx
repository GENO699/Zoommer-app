import React, { useState, useEffect } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import AuthForm from "./Register";
import { FaGoogle } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import axios from "axios";
import useUserStore from "./userContext";
import { useNavigate, Link } from "react-router-dom";

function SignInButton({ onLoginSuccess }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("user_email");
    localStorage.removeItem("userPassword");
    localStorage.removeItem("userFirstName");
    localStorage.removeItem("userLastName");

    setIsLoggedIn(false);

    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formData;

      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      const access_token = response.data.access_token;

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("userEmail", email);

      useUserStore.setState({ userEmail: email });

      console.log("Login successful!", response.data);

      setIsModalOpen(false);
      setIsLoggedIn(true);

      navigate("/");

      onLoginSuccess();
    } catch (error) {
      console.error("Login failed:", error.response);

      if (error.response && error.response.status === 401) {
        setError("Invalid email or password. Please try again.");
      } else {
        setError("An error occurred while logging in. Please try again later.");
      }
    }
  };

  useEffect(() => {
    const userEmailFromLocalStorage = localStorage.getItem("userEmail");
    if (userEmailFromLocalStorage) {
      useUserStore.setState({ userEmail: userEmailFromLocalStorage });
      setIsLoggedIn(true);
    }
  }, []);

  const userEmail = useUserStore((state) => state.userEmail);

  useEffect(() => {
    const updatedUserEmail = localStorage.getItem("userEmail");
    if (updatedUserEmail) {
      useUserStore.setState({ userEmail: updatedUserEmail });
    }
  }, [isLoggedIn]);

  const handleButtonClick = () => {
    if (isLoggedIn) {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      toggleModal();
    }
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={handleButtonClick}
          className="w-[auto] h-[45px] flex justify-center items-center gap-2 text-black font-semibold bg-white text-md dark:text-white rounded-xl px-5 py-2.5 text-center dark:bg-slate-700"
          type="button"
        >
          <FaRegCircleUser className="text-xl" />
          {isLoggedIn
            ? userEmail
              ? userEmail
              : t("signInButtonText")
            : t("signInButtonText")}
        </button>

        {isLoggedIn && isDropdownOpen && (
          <div className="absolute z-50 top-[calc(100%+5px)] left-0 mt-1 w-[230px] bg-white shadow-md rounded-lg dark:bg-slate-900 dark:text-white">
            <Link to={"/userprofile"} className="relative">
              <button className="w-full py-2 px-4 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 font-semibold">
                {t("ViewProfilePage")}
              </button>
            </Link>
            <button
              onClick={handleSignOut}
              className="w-full py-2 px-4 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-green-300 font-semibold text-red-600"
            >
              {t("SignOut")}
            </button>
          </div>
        )}
      </div>

      {/* Modal content */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex items-center justify-center">
          <div
            className="fixed inset-0 transition-opacity"
            aria-hidden="true"
            onClick={toggleModal}
          >
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div className="dark:bg-black relative p-4 w-full max-w-md rounded-xl">
            <div className="w-[100%] h-[auto] relative bg-white rounded-lg shadow dark:bg-slate-900 dark:text-white">
              <div className="w-[100%] h-[auto] flex items-center justify-between gap-7 p-4 border-b">
                <div className="w-[100%] flex justify-between items-center ">
                  <h3 className="w-[100%] flex justify-center text-lg font-semibold text-gray-900 cursor-pointer dark:text-white ">
                    {t("Authorization")}
                  </h3>
                  <AuthForm />
                </div>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close Modal</span>
                </button>
              </div>
              <div className="p-4">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      {t("Email")}
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="h-[50px] font-semibold bg-gray-100 border-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder={t("Email")}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      {t("Password")}
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder={t("Password")}
                      className="h-[50px] bg-gray-100 border-none font-semibold text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                    />
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <div className="flex justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5"></div>
                    </div>
                    <a
                      href="#"
                      className="text-xs font-semibold text-black hover:underline"
                    >
                      {t("ForgotPassword")}
                    </a>
                  </div>
                  <div className="h-[9vh] border-b-2 border-b-gray-200">
                    <button
                      type="submit"
                      className="w-full h-[50px] text-white bg-orange-500 font-semibold rounded-xl text-sm px-5 py-2.5"
                    >
                      {t("signInButtonText")}
                    </button>
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    <div className="w-[100%] h-[auto] flex justify-center items-center flex-col font-semibold">
                      <h1 className="text-xs text-black dark:text-white">
                        {t("AnotherMethod")}
                      </h1>
                      <button className="w-[100%] h-[50px] flex justify-center items-center bg-neutral-100 mt-6 rounded-xl dark:bg-slate-700 ">
                        <FaGoogle className="w-[40px] h-[40px] border border-gray-200 p-2 rounded-full bg-white text-lg text-red-600" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SignInButton;
