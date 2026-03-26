import { Box, TextField, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/global/Header";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAirTemplates } from "../../redux/actions/form.action";
import { MenuItem } from "@mui/material";
import FillAirForm from "./FillAirForm";

const AirForms = () => {
  const dispatch = useDispatch();
  const airForms = useSelector((state) => state.form?.forms?.data);
  const selectedOrgId = localStorage.getItem("selectedOrgId");
  const [selectedFormId, setSelectedFormId] = useState("");
  const [selectedFormData, setSelectedFormData] = useState(null);

  const handleFormSelect = (event) => {
    const selectedId = event.target.value;
    setSelectedFormId(selectedId);

    // Find the selected form data based on the ID
    const selectedForm = airForms.find((form) => form.id === selectedId);
    //console.log(selectedForm, "selectedForm");
    if (selectedForm) {
      setSelectedFormData(selectedForm);
    } else {
      setSelectedFormData(null);
    }
  };
  //console.log(selectedFormId, "selectedFormId");
  //console.log(selectedFormData, "selectedFormData");

  useEffect(() => {
    dispatch(getAirTemplates(selectedOrgId));
  }, [dispatch, selectedOrgId]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="end" mt="20px"></Box>
      <Header title="Air Forms" subtitle="Choose form to fill" />
      <Box>
        <TextField
          select
          label="Select form"
          className="select-box"
          sx={{ width: "20%" }}
          value={selectedFormId}
          onChange={handleFormSelect}
        >
          {airForms &&
            airForms.map((form) => (
              <MenuItem key={form.id} value={form.id}>
                {form.formName}
              </MenuItem>
            ))}
        </TextField>
      </Box>
      {selectedFormData && selectedFormId && (
        <FillAirForm formData={selectedFormData} formId={selectedFormId} />
      )}
    </Box>
  );
};

export default AirForms;
