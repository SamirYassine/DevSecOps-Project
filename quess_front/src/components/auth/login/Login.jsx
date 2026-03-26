import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../../../redux/actions/user.action";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(userLogin(login));
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      // Handle login error, such as displaying an error message
    }
  };
  return (
    <div className="loginBody">
      <div className="emptyDiv">

      </div>
      <div className="wrapper">
        <div className="bodyDiv">
          <form onSubmit={handleLogin}>
            <h1>QUESS Viable</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                required
                onChange={(e) =>
                  setLogin({ ...login, username: e.target.value })
                }
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="Password"
                placeholder="Password"
                required
                onChange={(e) =>
                  setLogin({ ...login, password: e.target.value })
                }
              />
              <FaLock className="icon" />
            </div>
            <div className="forgot">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
            <button type="submit"> Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
