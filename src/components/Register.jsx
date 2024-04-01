/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Modal } from "flowbite-react";
import { FaGoogle } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

const AuthForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    repeatPassword: "",
    phone_number: "",
  });
  const [error, setError] = useState("");
  const [registered, setRegistered] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { t } = useTranslation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      setRegistered(true);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const onCloseModal = () => {
    setOpenModal(false);
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      repeatPassword: "",
      phone_number: "",
    });
    setError("");
    setRegistered(false);
  };

  return (
    <div>
      <Modal
        show={openModal}
        size="md"
        onClose={onCloseModal}
        popup
        className="rounded-t-xl dark:bg-slate-900"
      >
        <Modal.Header className="dark:bg-slate-900 rounded-t-xl" />
        <Modal.Body className="dark:bg-slate-900 rounded-b-xl">
          <div className="max-w-sm mx-auto dark:bg-slate-900 ">
            <div className="h-[7vh] border-b-2 border-b-gray-200">
              <h2 className="text-2xl text-center font-bold mb-4  ">
                {t("Registration")}
              </h2>
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            {registered && (
              <p className="text-green-500 mb-4">
                You are successfully registered!
              </p>
            )}
            <form
              onSubmit={handleSubmit}
              className="space-y-4 mt-3 font-semibold "
            >
              <div>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  placeholder={t("Name")}
                  value={formData.first_name}
                  onChange={handleChange}
                  className="h-[50px] bg-gray-100 border-none mt-1 block w-full rounded-md border-gray-300 text-sm"
                />
              </div>
              <div>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  placeholder={t("LastName")}
                  value={formData.last_name}
                  onChange={handleChange}
                  className="h-[50px] bg-gray-100 text-sm border-none mt-1 block w-full rounded-md border-gray-300"
                />
              </div>
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={t("Email")}
                  value={formData.email}
                  onChange={handleChange}
                  className=" h-[50px] bg-gray-100 text-sm border-none mt-1 block w-full rounded-md border-gray-300"
                />
              </div>
              <div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder={t("Password")}
                  value={formData.password}
                  onChange={handleChange}
                  className="h-[50px] bg-gray-100 text-sm border-none mt-1 block w-full rounded-md border-gray-300"
                />
              </div>
              <div>
                <input
                  type="password"
                  id="repeatPassword"
                  name="repeatPassword"
                  placeholder={t("RepeatPassword")}
                  value={formData.repeatPassword}
                  onChange={handleChange}
                  className="h-[50px] bg-gray-100 text-sm border-none mt-1 block w-full rounded-md border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  id="phone_number"
                  name="phone_number"
                  placeholder={t("PhoneNumber")}
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="h-[50px] bg-gray-100 text-sm border-none mt-1 block w-full rounded-md border-gray-300"
                />
              </div>
              <div className="w-[100%] h-[auto] pl-2 flex justify-start items-center gap-2">
                <input
                  type="checkbox"
                  id="checkbox"
                  name="checkbox"
                  className="rounded-full border-gray-400 focus:accent-pink-500"
                />
                <h1 className="text-[12px] font-semibold ">
                  {t("ReadAndAgree")}{" "}
                  <a
                    href="#"
                    className="text-[12px] font-semibold text-orange-500"
                  >
                    {t("Terms")}
                  </a>
                </h1>
              </div>
              <div className="h-[9vh] border-b-2 border-b-gray-200">
                <button
                  type="submit"
                  className="w-full h-[50px] bg-orange-500 text-white font-bold py-2 px-4 rounded-xl"
                >
                  {t("Registration")}
                </button>
              </div>
              <div className="w-[100%] h-[auto] flex justify-center items-center flex-col font-semibold">
                <h1 className="text-xs text-black dark:text-white">
                  {t("AnotherMethod")}
                </h1>
                <button className="w-[100%] h-[50px] flex justify-center items-center bg-neutral-100 mt-6 rounded-xl dark:bg-slate-700 ">
                  <FaGoogle className="w-[40px] h-[40px] border border-gray-200 p-2 rounded-full bg-white text-lg text-red-600" />
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      <button
        onClick={() => setOpenModal(true)}
        className="w-[160px] h-[auto] font-semibold text-lg text-gray-900 dark:text-white  "
      >
        {t("Registration")}
      </button>
    </div>
  );
};

export default AuthForm;
