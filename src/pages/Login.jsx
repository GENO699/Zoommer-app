/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import useAuthStore from "../components/authStore";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

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
      const { email, password } = formData;

      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      console.log("Response data:", response.data);

      const access_token = response.data.access_token;

      localStorage.setItem("access_token", access_token);
      console.log(access_token);

      useAuthStore.getState().login(email);

      console.log("Login successful!", response.data);
    } catch (error) {
      console.error("Login failed:", error.response);

      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;
