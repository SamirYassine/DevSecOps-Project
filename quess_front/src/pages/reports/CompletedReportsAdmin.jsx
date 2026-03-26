import { Box, IconButton, Modal, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/global/Header";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";
import { Toaster, toast } from "sonner";

import { generateRevisedReport } from "../../redux/actions/report.action";
import {
  getValidatedAirReports,
  getValidatedSurfaceReports,
} from "../../redux/actions/form.action";

const CompletedReportsAdmin = () => {
  const dispatch = useDispatch();

  const selectedOrgId = localStorage.getItem("selectedOrgId");
  console.log(selectedOrgId, "selectedOrgId");
  const airForms = useSelector((state) => state.form?.airForms);
  const surfaceForms = useSelector((state) => state.form?.surfaceForms);

  const mergedFormsData = [
    ...airForms.map((form) => ({ ...form, formType: "Air" })),
    ...surfaceForms.map((form) => ({ ...form, formType: "Surface" })),
  ];
  console.log(mergedFormsData, "mergedFormsData");

  useEffect(() => {
    if (selectedOrgId) {
      dispatch(getValidatedAirReports(selectedOrgId));
      dispatch(getValidatedSurfaceReports(selectedOrgId));
    }
  }, [dispatch, selectedOrgId]);

  const handleGenerateReport = (id, formType) => {
    dispatch(generateRevisedReport({ id, formType }));

    toast.success("Report Generated Successfully");
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "rowNumber", headerAlign: "left", headerName: "#", width: 80 },
    {
      field: "org_name",
      headerAlign: "left",
      headerName: "Organization",
      flex: 1,
    },
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
              marginRight: "10px",
            }}
          >
            <SaveAltOutlinedIcon />
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
      org_name: form.Organization,
    };
  });

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="end" mt="20px"></Box>
      <Header
        title="Completed Reports"
        subtitle="Reports with recommendations added by BCE Pharma Admins"
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

export default CompletedReportsAdmin;
