import React, { useEffect, useState } from "react";
import { Button, Modal, TextField } from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { useDispatch } from "react-redux";
import { addOrg, findOrgs } from "../../redux/actions/org.action";
import placeholderimg from "../../components/Assets/placeholderimg.png";
import { setToastMessage } from "../../redux/Slice/toastSlice";
import { toast } from "sonner";

const AddOrganization = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    logo: "",
    nomOrg: "",
    phone: "",
    email: "",
    adresse: "",
  });
  useEffect(() => {
    dispatch(findOrgs());
  }, [dispatch, open]);

  const { nomOrg, phone, email, adresse, logo } = data;
  const formData = new FormData();
  formData.append("logo", logo);
  formData.append("nomOrg", nomOrg);
  formData.append("phone", phone);
  formData.append("email", email);
  formData.append("adresse", adresse);

  const [previewLogo, setPreviewLogo] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("Data:", formData);
    console.log("formdata", formData);
    //dispatch(addOrg(formData));
    try {
      const resultAction = await dispatch(addOrg(formData));
      console.log(resultAction, "resultAction");

      if (resultAction.type === "add/org/fulfilled") {
        const message = resultAction.payload;
        console.log(message, "message");
        if (message === "Organization added successfully") {
          dispatch(setToastMessage("Organization added successfully"));
        } else {
          toast.error("An unexpected response was received.");
        }
      } else {
        toast.error("An error occurred while adding the user.");
      }
    } catch (error) {
      toast.error("An error occurred: " + error.message);
    }
    handleClose();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("Selected File:", selectedFile);
    setData({ ...data, logo: selectedFile });
    setPreviewLogo(URL.createObjectURL(selectedFile));
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
        New Organization
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#69baf5",
            padding: "20px",
            width: 400, // Adjust the width as needed
            borderRadius: "15px",
          }}
        >
          <h2 style={{ color: "#3e4396" }} align="center">
            New Organization
          </h2>
          <form onSubmit={handleRegister}>
            <div>
              <img
                src={previewLogo || placeholderimg}
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
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
            <TextField
              label="Name"
              name="nomOrg"
              value={formData.name}
              onChange={(e) => setData({ ...data, nomOrg: e.target.value })}
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
              label="Phone"
              name="phone"
              type="tel"
              value={formData.name}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              fullWidth
              margin="normal"
              InputLabelProps={{ style: { color: "#3e4396" } }}
              required
            />
            <TextField
              label="Addresse"
              name="adresse"
              value={formData.name}
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
              Submit
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AddOrganization;
