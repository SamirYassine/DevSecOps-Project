import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/global/Header";
import AddOrganization from "./AddOrganization";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrganization, findOrgs } from "../../redux/actions/org.action";
import EditOrganization from "./EditOrganization";
import { IconButton } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { apiBaseUrlImage } from "../../proxy";
import {
  clearToastMessage,
  setToastMessage,
} from "../../redux/Slice/toastSlice";
import { Toaster, toast } from "sonner";

const Organizations = () => {
  const dispatch = useDispatch();
  const orgs = useSelector((state) => state.organization.orgs.data);
  const [orgDeleted, setOrgDeleted] = useState(false);

  useEffect(() => {
    dispatch(findOrgs());
  }, [dispatch, orgDeleted]);

  const toastMessage = useSelector((state) => state.toast.message);

  useEffect(() => {
    if (toastMessage) {
      toast.success(toastMessage);
      console.log("toastMessage", toastMessage);
      dispatch(clearToastMessage());
    }
  }, [toastMessage, dispatch]);

  const handleDeleteOrg = async (id) => {
    //dispatch(deleteOrganization(id));
    try {
      const resultAction = await dispatch(deleteOrganization(id));
      console.log(resultAction, "resultAction");

      if (resultAction.type === "delete/organization/fulfilled") {
        const message = resultAction.payload;
        console.log(message, "message");
        if (message === "Organization deleted successfully") {
          dispatch(setToastMessage("Organization deleted successfully"));
        } else {
          toast.error("An unexpected response was received.");
        }
      } else {
        toast.error("An error occurred while adding the user.");
      }
    } catch (error) {
      toast.error("An error occurred: " + error.message);
    }
    setOrgDeleted(true);
    dispatch(findOrgs());
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "logo",
      headerName: "Logo",
      flex: 1,
      renderCell: (params) => (
        <img
          src={`${apiBaseUrlImage}/${params.row.logo}`}
          alt="Logo"
          style={{
            maxWidth: 100,
            maxHeight: 50,
            width: "auto",
            height: "auto",
          }}
        />
      ),
    },
    {
      field: "nomOrg",
      headerName: "Organization Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "adresse",
      headerName: "Adress",
      flex: 1,
    },
    {
      field: "edit",
      headerName: "Action",
      headerAlign: "center",
      flex: 1,

      renderCell: (params) => (
        <Box display="flex" justifyContent="center">
          <EditOrganization orgData={params.row} />
          <IconButton
            onClick={() => handleDeleteOrg(params.id)}
            sx={{
              bgcolor: "#db4f4a",
              marginLeft: "10px",
              "&:hover": {
                bgcolor: "#af3f3b",
              },
            }}
          >
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Box>
      ),
    },
  ];
  const rows = [];

  orgs &&
    orgs.forEach((item) => {
      rows.push({
        id: item.id,
        logo: item.logo,
        nomOrg: item.nomOrg,
        phone: item.phone,
        email: item.email,
        adresse: item.adresse,
      });
    });

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="end" mt="20px">
        <AddOrganization />
      </Box>
      <Header title="Organizations" subtitle="Managing The Organizations" />
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
        <DataGrid checkboxSelection rows={rows} columns={columns} />
      </Box>

      <Toaster position="bottom-right" richColors />
    </Box>
  );
};

export default Organizations;
