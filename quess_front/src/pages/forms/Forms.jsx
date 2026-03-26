import React, { useState } from "react";
import { tokens } from "../../theme";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
} from "@mui/material";
import Header from "../../components/global/Header";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Forms = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [formType, setFormType] = useState(""); // State for form type selection

  const handleFormTypeChange = (event) => {
    setFormType(event.target.value);
  };
  return (
    <Box m="20px">
      <Header title="Forms" subtitle="Managing Forms" />
      <Box sx={{ display: "flex", gap: "10%", justifyContent: "center" }}>
        <Box sx={{ display: "flex", gap: "10%", justifyContent: "center" }}>
          <FormControl>
            <InputLabel id="form-type-label">Select Form Type</InputLabel>
            <Select
              labelId="form-type-label"
              value={formType}
              onChange={handleFormTypeChange}
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="air">Air Form</MenuItem>
              <MenuItem value="surface">Surface Form</MenuItem>
            </Select>
          </FormControl>
          {formType && (
            <Link
              to={`/forms/build/${formType}`}
              style={{ textDecoration: "none" }}
            >
              <Button
                color="secondary"
                variant="contained"
                sx={{
                  height: "auto",
                  width: "auto",
                  padding: "10px",
                  marginBottom: "20px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                Create {formType === "air" ? "Air Form" : "Surface Form"}
              </Button>
            </Link>
          )}
        </Box>
        <Link to="revise" style={{ textDecoration: "none" }}>
          <Button
            color="secondary"
            variant="contained"
            sx={{
              height: "auto",
              width: "auto",
              padding: "10px",
              marginBottom: "20px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
            to="/forms/revise"
          >
            <FactCheckOutlinedIcon sx={{ fontSize: 40 }} />
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Forms;
