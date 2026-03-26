import React, { useEffect, useState } from "react";
import { tokens } from "../../theme";
import { Box, useTheme } from "@mui/material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../../components/global/Header";
import { Toaster, toast } from "sonner";
import { clearToastMessage } from "../../redux/Slice/toastSlice";
import { useDispatch, useSelector } from "react-redux";

const Build = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const colors = tokens(theme.palette.mode);

  const [formType, setFormType] = useState(""); // State for form type selection

  const toastMessage = useSelector((state) => state.toast.message);

  useEffect(() => {
    if (toastMessage) {
      toast.success(toastMessage);
      console.log("toastMessage", toastMessage);
      dispatch(clearToastMessage());
    }
  }, [toastMessage, dispatch]);

  return (
    <Box m="20px">
      <Header title="Form's Filling" subtitle="Choose Form Type" />
      <Box sx={{ display: "flex", justifyContent: "center", gap: "10%" }}>
        <Link to="/air/forms" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setFormType("Air Forms")}
          >
            Air
          </Button>
        </Link>
        <Link to="/surface/forms" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setFormType("Surface Forms")}
          >
            Surface
          </Button>
        </Link>
      </Box>
      <Toaster position="bottom-right" richColors />
    </Box>
  );
};
export default Build;
