import React, { useEffect, useState } from "react";
import { Button, Modal, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import {
  
  createZone,
  getAirZonesByOrganizationId,
} from "../../redux/actions/zone.action";

const AddZone = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const selectedOrgId = localStorage.getItem("selectedOrgId");
  const [data, setData] = useState({
    name: "",
    organiaztionId: selectedOrgId,
  });
  useEffect(() => {
    if (open) {
      // dispatch(getZonesByOrganizationId(selectedOrgId));
    }
  }, [dispatch, open]);

  const { name } = data;
  const formData = new FormData();
  const dataForm = {
    name: name,
    organization_id: selectedOrgId,
  };

  const handleRegister = (e) => {
    e.preventDefault();
    formData.append("name", name);
    formData.append("organization_id", selectedOrgId);
    dispatch(createZone(dataForm));
    dispatch(getAirZonesByOrganizationId(selectedOrgId));
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
        <NearMeOutlinedIcon />
        New Zone
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
            <NearMeOutlinedIcon sx={{ color: "#3e4396", fontSize: "40" }} />
          </div>

          <form onSubmit={handleRegister}>
            <TextField
              label="Zone Name"
              name="name"
              value={formData.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              fullWidth
              margin="normal"
              InputLabelProps={{ style: { color: "#3e4396" } }}
              required
            />

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
              Add Zone
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AddZone;
