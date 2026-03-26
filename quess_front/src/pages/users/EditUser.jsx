import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Button, IconButton, Modal, TextField } from "@mui/material";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  findusers,
  getUsersByOrgId,
  updateUser,
} from "../../redux/actions/user.action";
import {
  deleteUserFromOrg,
  findOrgsByUserId,
  findUnassignedOrgs,
} from "../../redux/actions/userOrg.action";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { setToastMessage } from "../../redux/Slice/toastSlice";

const EditUser = ({ userData }) => {
  const role = useSelector((state) => state?.user?.role);
  const dispatch = useDispatch();
  const userOrgs = useSelector((state) => state?.userOrgs?.userOrgs?.data);
  const [orgDeleted, setOrgDeleted] = useState(false);
  const [userOrganisations, setUserOrganisations] = useState([]);
  useEffect(() => {
    setUserOrganisations(userOrgs);
  }, [userOrgs, orgDeleted]);
  const unassignedOrgs = useSelector(
    (state) => state?.userOrgs?.unassignedOrgs?.data
  );
  const [formData, setFormData] = useState(userData);
  const [open, setOpen] = useState(false);
  const [orgs, setOrgs] = useState([]);
  const [selectedOrgs, setSelectedOrgs] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    if (open || orgDeleted) {
      dispatch(findOrgsByUserId(userData.id));
      dispatch(findUnassignedOrgs(userData.id));
    }
  }, [dispatch, open, userData.id, orgDeleted]);

  useEffect(() => {
    setOrgs(unassignedOrgs);
  }, [dispatch, unassignedOrgs]);

  const handleAddOrg = () => {
    if (selectedOrg && selectedRole) {
      const orgToAdd = {
        organization_id: selectedOrg.id,
        nomOrg: selectedOrg.nomOrg,
        role: selectedRole,
      };
      console.log(orgToAdd);
      setSelectedOrgs([...selectedOrgs, orgToAdd]);
      setUserOrganisations([...userOrganisations, orgToAdd]);
      setOrgs(orgs.filter((org) => org.id !== selectedOrg.id));
      setSelectedOrg(null);
    }
  };

  const handleRemoveOrg = (orgId, userId) => {
    dispatch(deleteUserFromOrg({ orgId, userId }));
    setUserOrganisations(
      userOrganisations.filter((org) => org.organization_id !== orgId)
    ); // Remove deleted org from display
    setOrgDeleted(true);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      userOrgs: userOrganisations,
    };
    //dispatch(updateUser({ formData: updatedFormData, id: userData.id }));
    try {
      const resultAction = await dispatch(
        updateUser({ formData: updatedFormData, id: userData.id })
      );
      console.log(resultAction, "resultAction");

      if (resultAction.type === "update/user/fulfilled") {
        const message = resultAction.payload;
        console.log(message, "message");
        if (message === "User updated successfully") {
          dispatch(setToastMessage("User updated successfully"));
        } else {
          toast.error("An unexpected response was received.");
        }
      } else {
        toast.error("An error occurred while adding the user.");
      }
    } catch (error) {
      toast.error("An error occurred: " + error.message);
    }
    if (role === "OrgAdmin") {
      dispatch(getUsersByOrgId());
    } else if (role === "") {
      dispatch(findusers());
    }
    handleClose();
    if (role === "OrgAdmin") {
      dispatch(getUsersByOrgId());
    } else if (role === "") {
      dispatch(findusers());
    }
  };

  const handleRoleChange = (e, orgId) => {
    const newRole = e.target.value;

    setUserOrganisations((prevUserOrgs) =>
      prevUserOrgs.map((userOrg) =>
        userOrg.organization_id === orgId
          ? { ...userOrg, role: newRole }
          : userOrg
      )
    );
  };

  return (
    <div>
      <IconButton
        sx={{
          bgcolor: "#69baf5",
          marginLeft: "50px",
          "&:hover": {
            bgcolor: "#69baf5",
          },
        }}
        onClick={handleOpen}
      >
        <EditOutlinedIcon />
      </IconButton>
      <Modal open={open} onClose={handleClose}>
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
          <h2 style={{ color: "#3e4396" }} align="center">
            Edit User
          </h2>
          <form onSubmit={handleUpdate}>
            <TextField
              label="First Name"
              name="prenom"
              value={formData.prenom}
              onChange={(e) =>
                setFormData({ ...formData, prenom: e.target.value })
              }
              fullWidth
              margin="normal"
              InputLabelProps={{ style: { color: "#3e4396" } }}
            />
            <TextField
              label="Last Name"
              name="nom"
              value={formData.nom}
              onChange={(e) =>
                setFormData({ ...formData, nom: e.target.value })
              }
              fullWidth
              margin="normal"
              InputLabelProps={{ style: { color: "#3e4396" } }}
            />
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              fullWidth
              margin="normal"
              InputLabelProps={{ style: { color: "#3e4396" } }}
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              fullWidth
              margin="normal"
              InputLabelProps={{ style: { color: "#3e4396" } }}
            />
            <div className="select-container">
              <TextField
                select
                label="Organization"
                value={selectedOrg ? selectedOrg.id : ""}
                onChange={(e) =>
                  setSelectedOrg(
                    unassignedOrgs.find(
                      (org) => org.id === parseInt(e.target.value)
                    )
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
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ style: { color: "#3e4396" } }}
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
            <h3>User Organizations</h3>
            <div className="orgs-container">
              {userOrganisations &&
                userOrganisations.map((org) => (
                  <ul>
                    <li key={org.id}>
                      <div className="org-info">
                        <div> {org.nomOrg} </div>
                        <div className="role">
                          <select
                            value={org.role}
                            onChange={(e) =>
                              handleRoleChange(e, org.organization_id)
                            }
                          >
                            <option value="OrgAdmin">
                              Admin d'organisation
                            </option>
                            <option value="Employee">Employée</option>
                          </select>
                        </div>
                        <Button
                          onClick={() =>
                            handleRemoveOrg(org.organization_id, userData.id)
                          }
                          style={{ color: "red" }}
                        >
                          <DeleteIcon />
                        </Button>
                      </div>
                    </li>
                  </ul>
                ))}
            </div>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginLeft: "auto", display: "block" }}
            >
              Update
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};
export default EditUser;
