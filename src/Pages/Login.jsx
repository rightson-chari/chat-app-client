import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import logo from "../assets/logo.svg";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setValues({ ...values, [name]: value });
  };
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    if (!values.username || !values.password) {
      toast.error("Kindly fill all fields", toastOptions);
      setLoading(false);
      return;
    }
    axios
      .post("/auth/login", { ...values })
      .then((res) => {
        setLoading(false);
        if (res.data.username) {
          toast.success(`Welcome ${res.data.username}`, toastOptions);
          localStorage.setItem("chat-user", JSON.stringify(res.data));
          window.location.reload();
        } else {
          toast.error(`${res.data}`);
        }
      })
      .catch((e) => {
        setLoading(false);
        toast.error("There was an error", toastOptions);
      });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit} className="box">
        <div className="header">
          <img src={logo} alt="" />
          <span>SNAPPY</span>
        </div>
        <div className="content">
          <input
            type="text"
            name="username"
            placeholder="username"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
          />
          <button type="submit">{loading ? "Loading..." : "Login"}</button>
          <div className="details">
            DON'T HAVE AN ACCOUN?
            <span>
              <Link to="/register">REGISTER</Link>
            </span>
          </div>
        </div>
      </form>
      <ToastContainer />
    </Container>
  );
};
const Container = styled.div`
  background-color: #131324;
  min-height: 100vh;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;

  .box {
    padding: 2rem 3rem;
    background-color: #00000076;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    .header {
      display: flex;

      margin: 1rem;
      gap: 1rem;
      img {
        height: 5rem;
      }
      span {
        color: white;
        font-size: 2rem;
        font-weight: bold;
      }
    }
    .content {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      input {
        padding: 1rem;
        border-radius: 2rem;
        border: 0.1rem solid #4e0eff;
        background-color: transparent;
        color: white;
      }
      button {
        padding: 1rem;
        color: white;
        border-radius: 0.3rem;
        background: #997af0;
        transition: 0.3s ease-in;
        &:hover {
          background: #4e0eff;
        }
      }

      .details {
        span {
          color: #4e0eff;
          font-size: 1rem;
          margin-left: 0.3rem;
        }
      }
    }
  }
`;

export default Login;
