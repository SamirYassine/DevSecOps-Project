import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/global/Header";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { getZonesByOrganizationId } from "../../redux/actions/zone.action";
// import AddZone from "./AddZone";
// import EditZone from "./EditZone";

const Zones = () => {
  const dispatch = useDispatch();
  const selectedOrgId = localStorage.getItem("selectedOrgId");

  const zones = useSelector((state) => state.zone.zones);
  useEffect(() => {
    dispatch(getZonesByOrganizationId(selectedOrgId));
  }, [dispatch]);

  const handleDeleteOrg = (id) => {
    //dispatch(deleteOrganization(id));
    //setOrgDeleted(true);
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "rowNumber", headerName: "#", width: 80 },

    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "typeName",
      headerName: "Type",
      flex: 1,
    },

    /* {
      field: "edit",
      headerName: "Action",
      headerAlign: "center",
      flex: 1,

      renderCell: (params) => (
        <Box display="flex" justifyContent="center">
          <IconButton
            onClick={() => handleDeleteOrg(params.id)}
            sx={{
              bgcolor: "#db4f4a",
              marginLeft: "20rem",
              "&:hover": {
                bgcolor: "#af3f3b",
              },
            }}
          >
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Box>
      ),
    }, */
  ];
  const rowsWithRowNumber = zones
    ? zones.map((item, index) => ({
        id: item.id,
        rowNumber: index + 1,
        name: item.name,
        type: item.type,
        typeName: item.type === "A" ? "Air" : "Surface", // Convert 'A' to 'Air' and 'S' to 'Surface'
      }))
    : [];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="end" mt="20px">
        {/* <AddZone /> */}
      </Box>
      <Header title="Zones" subtitle="Managing The Zones" />
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
        <DataGrid rows={rowsWithRowNumber} columns={columns} />
      </Box>
    </Box>
  );
};

export default Zones;
