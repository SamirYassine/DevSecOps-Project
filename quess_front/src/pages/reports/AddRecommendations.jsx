import React, { useState } from "react";
import { Button, Modal, ThemeProvider } from "@mui/material";
import { useDispatch } from "react-redux";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import { reviseReport } from "../../redux/actions/report.action";
import RichText from "./RichText"; 
import { createTheme } from "@mui/material/styles";

const localTheme = createTheme({
  components: {
    MuiMenu: {
      styleOverrides: {
        paper: {
          zIndex: 10000, // Set the desired z-index for the color palette menu
        },
      },
    },
  },
});

const AddRecommendations = ({ Data }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [recommendations, setRecommendations] = useState(
    "<p>Hello <b>world</b>!</p>"
  );

  const handleRegister = (e) => {
    e.preventDefault();
    const dataform = {
      ...Data,
      recommendations,
    };
    const id = Data.id;
    console.log(id, "id test");
    dispatch(reviseReport({ dataform, id }));

    handleClose();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        type="submit"
        color="secondary"
        variant="contained"
        onClick={handleOpen}
      >
        <TroubleshootIcon />
        add Recommendations
      </Button>
      <ThemeProvider theme={localTheme}>
        <Modal
          open={open}
          onClose={handleClose}
          style={{ overflowY: "scroll", zIndex: "auto" }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#69baf5",
              padding: "20px",
              width: 800,
              borderRadius: "15px",
            }}
          >
            {/* <div
              style={{ display: "grid", placeItems: "center", height: "100%" }}
            >
              <TroubleshootIcon sx={{ color: "#3e4396", fontSize: "40" }} />
            </div> */}

            <form onSubmit={handleRegister}>
              <RichText
                content={recommendations}
                onContentChange={setRecommendations}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{
                  marginLeft: "auto",
                  display: "block",
                  marginTop: "20px",
                }}
              >
                Save and Send Recommendations
              </Button>
            </form>
          </div>
        </Modal>
      </ThemeProvider>
    </div>
  );
};

export default AddRecommendations;
