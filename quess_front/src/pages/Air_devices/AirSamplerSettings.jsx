import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/global/Header";
import AddAirSamplerSettings from "./AddAirSamplerSettings";
import EditAirSamplerSettings from "./EditAirSamplerSettings";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { IconButton } from "@mui/material";
import { getAllAirDevices } from "../../redux/actions/airDevice.action";
import { Toaster, toast } from "sonner";
import { clearToastMessage } from "../../redux/Slice/toastSlice";

const AirSamplerSettings = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const airDevices = useSelector(
    (state) => state?.airDevice?.airDevices?.data ?? []
  );
  const selectedOrgId = parseInt(localStorage.getItem("selectedOrgId"), 10);

  useEffect(() => {
    dispatch(getAllAirDevices(selectedOrgId));
  }, [dispatch]);

  const toastMessage = useSelector((state) => state.toast.message);

  useEffect(() => {
    if (toastMessage) {
      toast.success(toastMessage);
      console.log("toastMessage", toastMessage);
      dispatch(clearToastMessage());
    }
  }, [toastMessage, dispatch]);

  /* const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
    setUserDeleted(true);
  }; */

  const columns = [
    /* { field: "id", headerName: "ID", flex: 1 }, */
    {
      field: "deviceName",
      headerName: "Device Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "deviceType",
      headerName: "Device type",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "certificationDate",
      headerName: "Certification date",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "validationDate",
      headerName: "Validation date",
      flex: 1,
    },
    {
      field: "edit",
      headerName: "Action",
      headerAlign: "center",
      flex: 1,

      renderCell: (params) => (
        <Box display="flex" justifyContent="center">
          <EditAirSamplerSettings airdeviceData={params.row} />
          {/* <IconButton
            onClick={() => handleDeleteUser(params.id)}
            sx={{
              bgcolor: "#db4f4a",
              marginLeft: "10px",
              "&:hover": {
                bgcolor: "#af3f3b",
              },
            }}
          >
            <DeleteOutlineOutlinedIcon />
          </IconButton> */}
        </Box>
      ),
    },
  ];
  const rows = [];
  airDevices &&
    airDevices?.forEach((item) => {
      rows.push({
        id: item.id,
        deviceName: item.deviceName,
        deviceType: item.deviceType,
        certificationDate: item.certificationDate,
        validationDate: item.validationDate,
      });
    });

  /* users &&
    users?.forEach((item) => {
      rows.push({
        id: item.id,
        prenom: item.prenom,
        nom: item.nom,
        username: item.username,
        email: item.email,
      });
    }); */

  return (
    <Box m="20px" maxWidth="100%" overflowx="auto">
      <Box display="flex" justifyContent="end" mt="20px">
        <AddAirSamplerSettings />
      </Box>
      <Header
        title="Air Sampler Settings"
        subtitle="Managing The Air Sampler Settings"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          slots={{ Toolbar: GridToolbar }}
        />
      </Box>
      <Toaster position="bottom-right" richColors />
    </Box>
  );
};

export default AirSamplerSettings;
