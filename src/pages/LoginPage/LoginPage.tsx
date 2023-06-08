import "./LoginPage.css";
import Logo from "../../assets/logo.png";
import axios from "axios";
import React, { useState } from "react";
import { loginInterface } from "../../types/Types";
import useAuthStore from "../../zustand/AuthStore";
// import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const setUser = useAuthStore((state) => state.setUser);

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState<loginInterface>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<string>("");

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async (event: any) => {
    event.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/user/login`,
        credentials
      );
      // toast("Successful Login!", {
      //   type: "success",
      //   position: "bottom-right",
      //   autoClose: 2000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   draggable: true,
      //   progress: undefined,
      // });
      // setTimeout(() => {
      setUser(credentials.email);
      navigate("/");
      // }, 2000);
    } catch (err) {
      console.log(err);
      setErrors("Incorrect email or password.");
    }
  };

  return (
    <div className="login-container">
      <section className="login-header">
        <h1>Sign in to your Account</h1>
      </section>
      <div className="login-logo">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="login-title">
        <h1>Welcome to Event Registration System</h1>
      </div>
      <div className="login-form">
        <form>
          <div className="login-input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              onChange={onChangeHandler}
            />
          </div>
          <div className="login-input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              onChange={onChangeHandler}
            />
          </div>
          {errors && (
            <div style={{ padding: "5px 0" }}>
              <span style={{ color: "red" }}>{errors}</span>
            </div>
          )}
          <div className="button-group">
            <button type="submit" onClick={handleLogin}>
              Log In
            </button>
            <button type="button">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
