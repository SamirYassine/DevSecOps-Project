import React, { useEffect, useState } from "react";
import { Button, Modal, TextField } from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { useDispatch } from "react-redux";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import {
  airDeviceRegister,
  getAllAirDevices,
} from "../../redux/actions/airDevice.action";
import { toast } from "sonner";
import { setToastMessage } from "../../redux/Slice/toastSlice";

const AddAirSamplerSettings = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedCertificationDate, setselectedCertificationDate] =
    useState(null);
  const [selectedValidationDate, setselectedValidationDate] = useState(null);
  const selectedOrgId = parseInt(localStorage.getItem("selectedOrgId"), 10);

  const handleCertificationDateChange = (date) => {
    setselectedCertificationDate(date);
  };
  const handleValidationDateChange = (date) => {
    setselectedValidationDate(date);
  };

  const [data, setData] = useState({
    deviceName: "",
    deviceType: "",
    certificationDate: "",
    validationDate: "",
  });

  useEffect(() => {
    dispatch(getAllAirDevices(selectedOrgId));
  }, [dispatch, open]);

  const { deviceName, deviceType, certificationDate, validationDate } = data;
  const formData = new FormData();
  const dataForm = {
    deviceName: deviceName,
    deviceType: deviceType,
    certificationDate: certificationDate,
    validationDate: validationDate,
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formattedData = {
      deviceName: data.deviceName,
      deviceType: data.deviceType,
      certificationDate: dayjs(selectedCertificationDate).format("YYYY-MM-DD"),
      validationDate: dayjs(selectedValidationDate).format("YYYY-MM-DD"),
      selectedOrgId: selectedOrgId,
    };

    console.log(formattedData);
    //dispatch(airDeviceRegister(formattedData));
    try {
      const resultAction = await dispatch(airDeviceRegister(formattedData));
      console.log(resultAction, "resultAction");

      if (resultAction.type === "register/airDevice/fulfilled") {
        const message = resultAction.payload;
        console.log(message, "message");
        if (message === "Setting created successfully") {
          dispatch(setToastMessage("Setting created successfully"));
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
  return (
    <div>
      <Button
        type="submit"
        color="secondary"
        variant="contained"
        onClick={handleOpen}
      >
        <AddBoxOutlinedIcon />
        New Air Sampler
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
              label="Device name"
              name="deviceName"
              value={formData.deviceName}
              onChange={(e) => setData({ ...data, deviceName: e.target.value })}
              fullWidth
              margin="normal"
              InputLabelProps={{ style: { color: "#3e4396" } }}
              required
            />
            <TextField
              label="Device type"
              name="deviceType"
              value={formData.deviceType}
              onChange={(e) => setData({ ...data, deviceType: e.target.value })}
              fullWidth
              margin="normal"
              InputLabelProps={{ style: { color: "#3e4396" } }}
              required
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Certification date"
                value={selectedCertificationDate}
                onChange={handleCertificationDateChange}
                slotProps={{
                  textField: {
                    required: true,
                    margin: "normal",
                  },
                }}
                fullWidth
                required
                inputFormat="yyyy-MM-dd"
                adapter={AdapterDayjs}
                InputLabelProps={{ style: { color: "#3e4396" } }}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Validation date"
                value={selectedValidationDate}
                onChange={handleValidationDateChange}
                slotProps={{
                  textField: {
                    required: true,
                    margin: "normal",
                  },
                }}
                fullWidth
                required
                inputFormat="yyyy-MM-dd"
                adapter={AdapterDayjs}
                InputLabelProps={{ style: { color: "#3e4396" } }}
              />
            </LocalizationProvider>
            {/* <TextField
              label="Validation date"
              name="validationDate"
              value={formData.validationDate}
              onChange={(e) =>
                setData({ ...data, validationDate: e.target.value })
              }
              fullWidth
              margin="normal"
              InputLabelProps={{ style: { color: "#3e4396" } }}
              required
            /> */}
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
              Add Device
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AddAirSamplerSettings;
