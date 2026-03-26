import React, { useEffect, useState } from "react";
import { Button, Modal, TextField } from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useDispatch } from "react-redux";
import {
  findusers,
  getUsersByOrgId,
  userRegister,
} from "../../redux/actions/user.action";
import { findOrgs, getOrganization } from "../../redux/actions/org.action";
import { useSelector } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { toast } from "sonner";
import { setToastMessage } from "../../redux/Slice/toastSlice";

const AddUserForOrg = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const selectedOrgId = localStorage.getItem("selectedOrgId");
  const [selectedRole, setSelectedRole] = useState("");
  const [data, setData] = useState({
    nom: "",
    prenom: "",
    username: "",
    email: "",
    password: "",
  });

  const { nom, email, password, prenom, username } = data;
  const formData = new FormData();
  const dataForm = {
    nom: nom,
    prenom: prenom,
    email: email,
    password: password,
    username: username,
    orgs: [{ id: selectedOrgId, role: selectedRole }],
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    formData.append("nom", nom);
    formData.append("prenom", prenom);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("username", username);
    const orgData = JSON.stringify([{ id: selectedOrgId, role: selectedRole }]);
    //console.log(orgData, "orgData");
    formData.append("orgs", orgData);
    //dispatch(userRegister(dataForm));
    try {
      const resultAction = await dispatch(userRegister(dataForm));
      console.log(resultAction, "resultAction");

      if (resultAction.type === "register/user/fulfilled") {
        const message = resultAction.payload;
        console.log(message, "message");
        if (message === "User added successfully") {
          dispatch(setToastMessage("User added successfully"));
        } else {
          toast.error("An unexpected response was received.");
        }
      } else {
        toast.error("An error occurred while adding the user.");
      }
    } catch (error) {
      toast.error("An error occurred: " + error.message);
    }
    dispatch(getUsersByOrgId());
    handleClose();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button
        type="submit"
        color="secondary"
        variant="contained"
        onClick={handleOpen}
      >
        <AddBoxOutlinedIcon />
        New User
      </Button>
      <Modal open={open} onClose={handleClose} style={{ overflowY: "scroll" }}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#69baf5",
            padding: "20px",
            width: 400,
            borderRadius: "15px",
          }}
        >
          <div
            style={{ display: "grid", placeItems: "center", height: "100%" }}
          >
            <PersonAddAltOutlinedIcon
              sx={{ color: "#3e4396", fontSize: "40" }}
            />
          </div>

          <form onSubmit={handleRegister}>
            <TextField
              label="First Name"
              name="prenom"
              value={formData.prenom}
              onChange={(e) => setData({ ...data, nom: e.target.value })}
              fullWidth
              margin="normal"
              InputLabelProps={{ style: { color: "#3e4396" } }}
              required
            />
            <TextField
              label="Last Name"
              name="nom"
              value={formData.nom}
              onChange={(e) => setData({ ...data, prenom: e.target.value })}
              fullWidth
              margin="normal"
              InputLabelProps={{ style: { color: "#3e4396" } }}
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              fullWidth
              margin="normal"
              InputLabelProps={{ style: { color: "#3e4396" } }}
              required
            />
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
              fullWidth
              margin="normal"
              InputLabelProps={{ style: { color: "#3e4396" } }}
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              fullWidth
              margin="normal"
              InputLabelProps={{ style: { color: "#3e4396" } }}
              required
            />

            <div style={{ display: "flex", alignItems: "center" }}>
              <TextField
                select
                label="Role"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{ style: { color: "#3e4396" } }}
                required
              >
                <MenuItem value="">Select Role</MenuItem>
                <MenuItem value="OrgAdmin">Admin d'organisation</MenuItem>
                <MenuItem value="Employee">Employée</MenuItem>
              </TextField>
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{
                marginLeft: "auto",
                display: "block",
                marginTop: "20px",
              }}
            >
              Add User
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AddUserForOrg;
