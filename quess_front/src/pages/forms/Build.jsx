import React, { useEffect, useState } from "react";
import { tokens } from "../../theme";
import { Box, useTheme } from "@mui/material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../../components/global/Header";
import { Toaster, toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { clearToastMessage } from "../../redux/Slice/toastSlice";

const Build = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();

  const [formType, setFormType] = useState(""); // State for form type selection

  const toastMessage = useSelector((state) => state.toast.message);

  useEffect(() => {
    if (toastMessage) {
      toast.success(toastMessage);
      console.log("toastMessage", toastMessage);
      dispatch(clearToastMessage());
    }
  }, [toastMessage, dispatch]); // Only include toastMessage and dispatch in the dependencies

  return (
    <Box m="20px">
      <Header title="Form's Building" subtitle="Choose Form Type" />
      <Box sx={{ display: "flex", justifyContent: "center", gap: "10%" }}>
        <Link to="/forms/build/air" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setFormType("air")}
          >
            Air
          </Button>
        </Link>
        <Link to="/forms/build/surface" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setFormType("surface")}
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
