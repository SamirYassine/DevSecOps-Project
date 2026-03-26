import { Box, TextField, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/global/Header";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MenuItem } from "@mui/material";
import { getZonesByOrganizationId } from "../../redux/actions/zone.action";
import { getLocalizationsByZone } from "../../redux/actions/localization.action";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const Localizations = () => {
  const dispatch = useDispatch();
  const selectedOrgId = localStorage.getItem("selectedOrgId");
  console.log(selectedOrgId, "selectedOrgId");
  const zones = useSelector((state) => state.zone.zones);
  console.log(zones, "zones");
  const [selectedZoneId, setSelectedZoneId] = useState(null);
  const localizations = useSelector(
    (state) => state.localization.localizations
  );
  console.log(localizations, "localizations");
  const [selectedType, setSelectedType] = useState("Air");
  useEffect(() => {
    dispatch(getZonesByOrganizationId(selectedOrgId));
  }, [dispatch]);

  useEffect(() => {
    if (selectedZoneId) {
      dispatch(getLocalizationsByZone(selectedZoneId));
    }
  }, [dispatch, selectedZoneId]);

  const handleZoneSelect = (event) => {
    const selectedId = event.target.value;
    console.log(selectedId, "selectedId");

    setSelectedZoneId(selectedId);
  };

  const handleTypeSelect = (event) => {
    setSelectedType(event.target.value);
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const filteredZones = zones.filter(
    (zone) => zone.type === (selectedType === "Air" ? "A" : "S")
  );

  const columns = [
    { field: "rowNumber", headerName: "#", width: 80 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "iso", headerName: "ISO", flex: 1 },
    { field: "threshold", headerName: "Threshold", flex: 1 },
  ];

  const rows = localizations.map((localization, index) => {
    return {
      ...localization,
      id: localization.id,
      rowNumber: index + 1,
    };
  });

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="end" mt="20px"></Box>
      <Header title="Localizations" subtitle="Choose form to fill" />
      <Box>
        <TextField
          select
          label="Select Type"
          className="select-box"
          sx={{ width: "20%" }}
          value={selectedType}
          onChange={handleTypeSelect}
        >
          <MenuItem value="Air">Air</MenuItem>
          <MenuItem value="Surface">Surface</MenuItem>
        </TextField>
        <TextField
          select
          label="Select Zone"
          className="select-box"
          sx={{ width: "20%", marginLeft: "20px" }}
          value={selectedZoneId}
          onChange={handleZoneSelect}
        >
          {filteredZones.map((zone) => (
            <MenuItem key={zone.id} value={zone.id}>
              {zone.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>
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
    </Box>
  );
};

export default Localizations;
