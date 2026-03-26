import React, { useEffect, useState } from "react";
import { Button, Modal, TextField } from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useDispatch } from "react-redux";
import { findusers, userRegister } from "../../redux/actions/user.action";
import { findOrgs } from "../../redux/actions/org.action";
import { useSelector } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { toast } from "sonner";
import { setToastMessage } from "../../redux/Slice/toastSlice";

const AddUser = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [orgs, setOrgs] = useState([]);
  const organisations = useSelector((state) => state.organization.orgs.data);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [selectedOrgs, setSelectedOrgs] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [data, setData] = useState({
    nom: "",
    prenom: "",
    username: "",
    email: "",
    password: "",
  });
  const roleTranslations = {
    OrgAdmin: "Admin d'organisation",
    Employee: "Employée",
  };
  useEffect(() => {
    if (open) {
      dispatch(findOrgs());
    }
  }, [dispatch, open]);

  useEffect(() => {
    setOrgs(organisations);
  }, [dispatch, organisations]);
  const { nom, email, password, prenom, username } = data;
  const formData = new FormData();
  const dataForm = {
    nom: nom,
    prenom: prenom,
    email: email,
    password: password,
    username: username,
    orgs: selectedOrgs.map((org) => ({
      id: org.id,
      role: selectedRoles[org.id],
    })),
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    formData.append("nom", nom);
    formData.append("prenom", prenom);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("username", username);
    const orgsData = JSON.stringify(
      selectedOrgs.map((org) => ({
        id: org.id,
        role: selectedRoles[org.id],
      }))
    );
    formData.append("orgs", orgsData);
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
    dispatch(findusers());
    handleClose();
  };

  const handleAddOrg = () => {
    if (selectedOrg) {
      const orgToAdd = {
        id: selectedOrg.id,
        nomOrg: selectedOrg.nomOrg,
        role: selectedRoles[selectedOrg.id],
      };
      console.log(orgToAdd);
      setSelectedOrgs([...selectedOrgs, orgToAdd]);
      setOrgs(orgs.filter((org) => org.id !== selectedOrg.id));
      setSelectedOrg(null);
    }
  };
  const handleRemoveOrg = (orgId) => {
    // Filter out the removed organization from the selected list
    const removedOrg = selectedOrgs.find((org) => org.id === orgId);
    setSelectedOrgs(selectedOrgs.filter((org) => org.id !== orgId));

    if (removedOrg) {
      setOrgs([...orgs, removedOrg]);
    }
    setSelectedOrg(null);
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

            <div className="select-container">
              <TextField
                select
                label="Organization"
                className="select-box"
                value={selectedOrg ? selectedOrg.id : ""}
                onChange={(e) =>
                  setSelectedOrg(
                    orgs.find((org) => org.id === parseInt(e.target.value))
                  )
                }
                fullWidth
                InputLabelProps={{ style: { color: "#3e4396" } }}
              >
                {orgs &&
                  orgs.map((org) => (
                    <MenuItem key={org.id} value={org.id}>
                      {org.nomOrg}
                    </MenuItem>
                  ))}
              </TextField>
            </div>
            {selectedOrg && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <TextField
                  select
                  label="Role"
                  value={selectedRoles[selectedOrg.id] || ""}
                  onChange={(e) =>
                    setSelectedRoles({
                      ...selectedRoles,
                      [selectedOrg.id]: e.target.value,
                    })
                  }
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ style: { color: "#3e4396" } }}
                  required
                >
                  <MenuItem value="">Select Role</MenuItem>
                  <MenuItem value="OrgAdmin">Admin d'organisation</MenuItem>
                  <MenuItem value="Employee">Employée</MenuItem>
                </TextField>
                <Button onClick={handleAddOrg}>
                  <AddCircleOutlineOutlinedIcon />
                </Button>
              </div>
            )}

            {selectedOrgs.length > 0 && (
              <div className="remove-container">
                <ul>
                  {selectedOrgs.map((org) => (
                    <li key={org.id}>
                      <div className="org-info">
                        <div>{org.nomOrg}</div>
                        <div className="role">
                          {roleTranslations[selectedRoles[org.id]]}
                          <Button
                            onClick={() => handleRemoveOrg(org.id)}
                            style={{ color: "red" }}
                          >
                            <RemoveCircleOutlinedIcon />
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
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

export default AddUser;
