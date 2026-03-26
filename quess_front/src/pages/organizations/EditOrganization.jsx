import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, IconButton, Modal, TextField } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { findOrgs, updateOrganization } from "../../redux/actions/org.action";
import { apiBaseUrlImage } from "../../proxy";
import { toast } from "sonner";
import { setToastMessage } from "../../redux/Slice/toastSlice";

const EditOrganization = ({ orgData }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState(orgData);
  const [logoFile, setLogoFile] = useState(null);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedData = {
      ...data,
      logo: logoFile,
    };
    //dispatch(updateOrganization({ data: updatedData, id: orgData.id }));
    try {
      const resultAction = await dispatch(
        updateOrganization({ data: updatedData, id: orgData.id })
      );
      console.log(resultAction, "resultAction");

      if (resultAction.type === "update/organization/fulfilled") {
        const message = resultAction.payload;
        console.log(message, "message");
        if (message === "Organization updated successfully") {
          dispatch(setToastMessage("Organization updated successfully"));
        } else {
          toast.error("An unexpected response was received.");
        }
      } else {
        toast.error("An error occurred while adding the user.");
      }
    } catch (error) {
      toast.error("An error occurred: " + error.message);
    }
    dispatch(findOrgs());
    handleClose();
    dispatch(findOrgs());
  };
  const handleLogoChange = (e) => {
    setLogoFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  return (
    <div>
      <IconButton
        sx={{
          bgcolor: "#0094ff",
          marginLeft: "50px",
          "&:hover": {
            bgcolor: "#0061a8",
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
            Edit Organization
          </h2>
          <form onSubmit={handleUpdate}>
            <div>
              <img
                src={
                  logoFile
                    ? URL.createObjectURL(logoFile)
                    : `${apiBaseUrlImage}${data.logo}`
                }
                alt="Logo"
                style={{
                  maxWidth: 100,
                  maxHeight: 50,
                  width: "auto",
                  height: "auto",
                }}
              />
            </div>
            <div>
              <input
                type="file"
                name="logo"
                onChange={handleLogoChange}
                accept="image/*"
              />
            </div>

            <TextField
              label="Name"
              name="name"
              value={data.nomOrg}
              onChange={(e) => setData({ ...data, nomOrg: e.target.value })}
              fullWidth
              margin="normal"
              InputLabelProps={{ style: { color: "#3e4396" } }}
            />
            <TextField
              label="Phone"
              name="phone"
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              fullWidth
              margin="normal"
              InputLabelProps={{ style: { color: "#3e4396" } }}
            />
            <TextField
              label="Email"
              name="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              fullWidth
              margin="normal"
              InputLabelProps={{ style: { color: "#3e4396" } }}
            />
            <TextField
              label="Adress"
              name="adresse"
              value={data.adresse}
              onChange={(e) => setData({ ...data, adresse: e.target.value })}
              fullWidth
              margin="normal"
              InputLabelProps={{ style: { color: "#3e4396" } }}
            />
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

export default EditOrganization;
