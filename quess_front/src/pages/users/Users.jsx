import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/global/Header";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  findusers,
  getUsersByOrgId,
} from "../../redux/actions/user.action";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { IconButton } from "@mui/material";
import { Toaster, toast } from "sonner";
import AddUserForOrg from "./AddUserForOrg";
import {
  clearToastMessage,
  setToastMessage,
} from "../../redux/Slice/toastSlice";

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const users = useSelector((state) => state?.user?.users?.data ?? []);

  const [userDeleted, setUserDeleted] = useState(false);
  const role = useSelector((state) => state?.user?.role);

  useEffect(() => {
    if (role === "OrgAdmin") {
      dispatch(getUsersByOrgId());
    } else if (role === "") {
      dispatch(findusers());
    }
  }, [dispatch, userDeleted, role]);

  const toastMessage = useSelector((state) => state.toast.message);

  useEffect(() => {
    if (toastMessage) {
      toast.success(toastMessage);
      console.log("toastMessage", toastMessage);
      dispatch(clearToastMessage());
    }
  }, [toastMessage, dispatch]);

  const handleDeleteUser = async (id) => {
    //dispatch(deleteUser(id));

    try {
      const resultAction = await dispatch(deleteUser(id));
      console.log(resultAction, "resultAction");

      if (resultAction.type === "delete/user/fulfilled") {
        const message = resultAction.payload;
        console.log(message, "message");
        if (message === "User deleted successfully") {
          dispatch(setToastMessage("User deleted successfully"));
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
    setUserDeleted(true);
  };

  const columns = [
    { field: "rowNumber", headerName: "#", width: 80 },
    {
      field: "nom",
      headerName: "Last Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "prenom",
      headerName: "First Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "username",
      headerName: "Username",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "edit",
      headerName: "Action",
      headerAlign: "center",
      flex: 1,

      renderCell: (params) => (
        <Box display="flex" justifyContent="center">
          <EditUser userData={params.row} />
          <IconButton
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
          </IconButton>
        </Box>
      ),
    },
  ];
  const rowsWithRowNumber = users.map((item, index) => ({
    id: item.id,
    rowNumber: index + 1,
    prenom: item.prenom,
    nom: item.nom,
    username: item.username,
    email: item.email,
  }));

  return (
    <Box m="20px" maxWidth="100%" overflowx="auto">
      <Box display="flex" justifyContent="end" mt="20px">
        {role === "OrgAdmin" ? <AddUserForOrg /> : <AddUser />}
      </Box>
      <Header title="Users" subtitle="Managing The Users" />
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
          rows={rowsWithRowNumber}
          columns={columns}
          slots={{ Toolbar: GridToolbar }}
        />
      </Box>
      <Toaster position="bottom-right" richColors />
    </Box>
  );
};

export default Users;
