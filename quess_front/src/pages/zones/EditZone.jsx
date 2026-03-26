import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, IconButton, Modal, TextField } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { findOrgs, updateOrganization } from "../../redux/actions/org.action";
import { apiBaseUrlImage } from "../../proxy";
import {
  getZonesByOrganizationId,
  updateZone,
} from "../../redux/actions/zone.action";

const EditZone = ({ Data }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState(Data);
  const selectedOrgId = localStorage.getItem("selectedOrgId");

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedData = {
      name: data.name,
      organization_id: selectedOrgId,
      id: Data.id,
    };
    dispatch(updateZone(updatedData));
    dispatch(getZonesByOrganizationId(selectedOrgId));
    handleClose();
    dispatch(getZonesByOrganizationId(selectedOrgId));
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
            Edit Zone
          </h2>
          <form onSubmit={handleUpdate}>
            <TextField
              label="Name"
              name="name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
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

export default EditZone;
