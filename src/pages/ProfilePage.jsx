import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";

function UpdateUserInfoForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone_number: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("Access token not found");
      }
      const response = await axios.get(
        "http://localhost:3000/user/current-user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const currentUser = response.data;
      setFormData({
        email: currentUser.email,
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        phone_number: currentUser.phone_number,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching current user:", error);
      navigate("/login");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("Access token not found");
      }
      await axios.put("http://localhost:3000/user", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("user_email");
      localStorage.setItem("user_email", formData.email);
      console.log("User information updated successfully!");
      navigate("/userprofile");
    } catch (error) {
      console.error("Error updating user information:", error);
      setError("An error occurred while updating user information.");
    }
  };

  return (
    <div className="update-user-info-container dark:bg-slate-700">
      <Header />
      <h1 className="update-user-info-title">{t("EditProfile")}</h1>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-orange-500 h-24 w-24"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="update-user-info-form mt-32">
          <div className="form-group">
            <label className="form-label">{t("Email")}:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">{t("Password")}:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">{t("First Name")}:</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">{t("Last Name")}:</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">{t("Phone Number")}:</label>
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <button type="submit" className="submit-button">
            {t("SaveChanges")}
          </button>
        </form>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default UpdateUserInfoForm;
