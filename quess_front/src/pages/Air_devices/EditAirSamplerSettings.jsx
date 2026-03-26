import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, IconButton, Modal, TextField } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { apiBaseUrlImage } from "../../proxy";
import {
  getAllAirDevices,
  updateAirDevice,
} from "../../redux/actions/airDevice.action";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { toast } from "sonner";
import { setToastMessage } from "../../redux/Slice/toastSlice";

const EditAirSamplerSettings = ({ airdeviceData }) => {
  const dispatch = useDispatch();
  const selectedOrgId = parseInt(localStorage.getItem("selectedOrgId"), 10);

  const [data, setData] = useState(airdeviceData);
  console.log(data, "data");
  const [newCertificationDate, setNewCertificationDate] = useState("");
  const [newValidationDate, setNewValidationDate] = useState("");
  console.log(
    newCertificationDate,
    newValidationDate,
    "newCertificationDate, newValidationDate"
  );

  useEffect(() => {
    setData(airdeviceData);
  }, [airdeviceData]);

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
      certificationDate: newCertificationDate,
      validationDate: newValidationDate,
    };

    console.log(updatedData);

    //dispatch(updateAirDevice({ data: updatedData, id: airdeviceData.id }));
    try {
      const resultAction = await dispatch(
        updateAirDevice({ data: updatedData, id: airdeviceData.id })
      );
      console.log(resultAction, "resultAction");

      if (resultAction.type === "update/airDevice/fulfilled") {
        const message = resultAction.payload;
        console.log(message, "message");
        if (message === "Setting updated successfully") {
          dispatch(setToastMessage("Setting updated successfully"));
        } else {
          toast.error("An unexpected response was received.");
        }
      } else {
        toast.error("An error occurred while adding the user.");
      }
    } catch (error) {
      toast.error("An error occurred: " + error.message);
    }

    dispatch(getAllAirDevices(selectedOrgId));
    handleClose();
    dispatch(getAllAirDevices(selectedOrgId));
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
            Edit Air Sampler Settings
          </h2>
          <form onSubmit={handleUpdate}>
            {/* <TextField
              label="Device Name"
              name="deviceName"
              value={data.deviceName}
              onChange={(e) => setData({ ...data, deviceName: e.target.value })}
              fullWidth
              margin="normal"
              InputLabelProps={{ style: { color: "#3e4396" } }}
              required
            />
            <TextField
              label="Device Type"
              name="deviceType"
              value={data.deviceType}
              onChange={(e) => setData({ ...data, deviceType: e.target.value })}
              fullWidth
              margin="normal"
              InputLabelProps={{ style: { color: "#3e4396" } }}
              required
            /> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Certification date"
                defaultValue={dayjs(data.certificationDate)}
                onChange={(e) =>
                  setNewCertificationDate(dayjs(e).format("YYYY-MM-DD"))
                }
                fullWidth
                inputFormat="YYYY-MM-DD"
                adapter={AdapterDayjs}
                InputLabelProps={{ style: { color: "#3e4396" } }}
                slotProps={{
                  textField: {
                    required: true,
                    margin: "normal",
                  },
                }}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Validation date"
                defaultValue={dayjs(data.validationDate)}
                onChange={(e) =>
                  setNewValidationDate(dayjs(e).format("YYYY-MM-DD"))
                }
                fullWidth
                required
                inputFormat="YYYY-MM-DD"
                adapter={AdapterDayjs}
                InputLabelProps={{ style: { color: "#3e4396" } }}
                slotProps={{
                  textField: {
                    required: true,
                    margin: "normal",
                  },
                }}
              />
            </LocalizationProvider>

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

export default EditAirSamplerSettings;
