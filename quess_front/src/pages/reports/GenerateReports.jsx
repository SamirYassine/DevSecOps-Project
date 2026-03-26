import { Box, IconButton, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/global/Header";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import InputIcon from "@mui/icons-material/Input";
import { Toaster, toast } from "sonner";

import {
  getAirFormsForReport,
  getSurfaceFormsForReport,
} from "../../redux/actions/form.action";

import { generateReport } from "../../redux/actions/report.action";

const GenerateReports = () => {
  const dispatch = useDispatch();
  const selectedOrgId = localStorage.getItem("selectedOrgId");
  console.log(selectedOrgId, "selectedOrgId");
  const airForms = useSelector((state) => state.form?.airForms);
  const surfaceForms = useSelector((state) => state.form?.surfaceForms);
  //console.log(surfaceForms, "surfaceForms");

  const mergedFormsData = [
    ...airForms.map((form) => ({ ...form, formType: "Air" })),
    ...surfaceForms.map((form) => ({ ...form, formType: "Surface" })),
  ];
  console.log(mergedFormsData, "mergedFormsData");

  useEffect(() => {
    if (selectedOrgId) {
      dispatch(getSurfaceFormsForReport(selectedOrgId));
      dispatch(getAirFormsForReport(selectedOrgId));
    }
  }, [dispatch, selectedOrgId]);

  const handleGenerateReport = (id, formType) => {
    console.log(id, formType, "id, formType");
    dispatch(generateReport({ id, formType }));
    toast.success("Report generated successfully and sent for recommendation!");
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "rowNumber", headerAlign: "left", headerName: "#", width: 80 },
    {
      field: "form_name",
      headerAlign: "left",
      headerName: "Form Name",
      flex: 1,
    },
    {
      field: "formType",
      headerAlign: "left",
      headerName: "Form Type",
      flex: 1,
    },
    {
      field: "edit",
      headerName: "Generate Report",
      headerAlign: "left",
      flex: 1,

      renderCell: (params) => (
        <Box display="flex" justifyContent="left">
          <IconButton
            onClick={() => {
              console.log(params);
              handleGenerateReport(params.row.id, params.row.formType);
            }}
            sx={{
              bgcolor: "#FFD700", // Yellow color
              marginLeft: "10px",
              "&:hover": {
                bgcolor: "#FFB300",
              },
            }}
          >
            <InputIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  const rows = mergedFormsData.map((form, index) => {
    return {
      ...form,
      id: form.id,
      rowNumber: index + 1,
      form_name: form.formName,
      formType: form.formType,
    };
  });

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="end" mt="20px"></Box>
      <Header
        title="Generate Reports"
        subtitle="Generate reports based on filled forms "
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

export default GenerateReports;
