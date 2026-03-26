import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../login/Login.css";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { userRegister } from "../../../redux/actions/user.action";
import { MdEmail } from "react-icons/md";

const Register = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    nom: "",
    prenom: "",
    username: "",
    email: "",
    password: "",
    role: "",
    nomOrg: "",
  });
  const { nom, email, password, prenom, role, username } = data;
  const formData = new FormData();
  formData.set("nom", nom);
  formData.set("prenom", prenom);
  formData.set("email", email);
  formData.set("role", role);
  formData.set("password", password);
  formData.set("username", username);
  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(userRegister(formData));
  };
  return (
    <div className="wrapper">
      <form onSubmit={handleRegister}>
        <h1>QUESS Viable</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="Nom"
            required
            onChange={(e) => setData({ ...data, nom: e.target.value })}
          />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input
            type="text"
            placeholder="Prenom"
            required
            onChange={(e) => setData({ ...data, prenom: e.target.value })}
          />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input
            type="text"
            placeholder="username"
            required
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input
            type="email"
            placeholder="email"
            required
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <MdEmail className="icon" />
        </div>
        <div className="input-box">
          <input
            type="Password"
            placeholder="password"
            required
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <FaLock className="icon" />
        </div>
        <div className="select-container">
          <select
            className="select-box"
            value={data.role}
            onChange={(e) => setData({ ...data, role: e.target.value })}
            required
          >
            <option value="">Select Role</option>
            <option value="OrgAdmin">Admin d'organisation</option>
            <option value="Employee">Employée</option>
          </select>
        </div>
        <div className="forgot">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
        <button type="submit"> Register</button>
      </form>
    </div>
  );
};

export default Register;
