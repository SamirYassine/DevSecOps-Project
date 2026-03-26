import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import CircleIcon from "@mui/icons-material/Circle";
import { FaSquare } from "react-icons/fa";
import { TbTriangleFilled } from "react-icons/tb";
import { Box, Button, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { createPlan } from "../../redux/actions/plan.action";
import { useDispatch } from "react-redux";
import Header from "../../components/global/Header";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import SaveIcon from "@mui/icons-material/Save";
import { Toaster, toast } from "sonner";
import { clearToastMessage, setToastMessage } from "../../redux/Slice/toastSlice";

const symbols = [
  {
    id: 1,
    Component: CircleIcon,
    color: "#0673b6",
    name: "Surface sampling (SS)",
  },
  { id: 2, Component: FaSquare, color: "#99b669", name: "Air sampling (AS)" },
  {
    id: 3,
    Component: TbTriangleFilled,
    color: "#ed1b98",
    name: "Temperature and humidity (THM)",
  },
];

const Drg = () => {
  const dispatch = useDispatch();
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [symbolsOnPlan, setSymbolsOnPlan] = useState([]);
  const [redCounter, setRedCounter] = useState(0);
  const [greenCounter, setGreenCounter] = useState(0);
  const [blueCounter, setBlueCounter] = useState(0);
  const selectedOrgId = localStorage.getItem("selectedOrgId");
  const [data, setData] = useState({
    organization_id: selectedOrgId,
    name: "",
    image: "",
    image_size: [],
    markers: [],
  });

  const [image, setImage] = useState(null);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const imageContainerRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setData({ ...data, image: file });
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleImageLoad = (e) => {
    //console.log(e.target.width, e.target.height, "image load");
    const width = e.target.naturalWidth; // Use naturalWidth to get the actual dimensions of the image
    const height = e.target.naturalHeight;
    setImageDimensions({ width, height });
    //console.log(width, height);
  };

  /* const handleSymbolDragStop = (e, data, symbolId) => {
    const containerWidth = imageContainerRef.current.offsetWidth;
    const containerHeight = imageContainerRef.current.offsetHeight;
    const newPosX = (data.x / containerWidth) * 100;
    const newPosY = (data.y / containerHeight) * 100;

    console.log("Dragged Symbol ID:", symbolId);
    console.log("New Position in pixels:", data.x, data.y);
    console.log("New Position in percentage:", newPosX, newPosY);

    setSymbolsOnPlan((prevSymbols) =>
      prevSymbols.map((symbol) =>
        symbol.id === symbolId
          ? { ...symbol, position: { x: newPosX, y: newPosY } }
          : symbol
      )
    );
  }; */

  const handleSymbolClick = (symbol) => {
    setSelectedSymbol(symbol);
  };

  const handleMouseClick = (e) => {
    if (selectedSymbol) {
      const symbolId = selectedSymbol.id;
      let newCount;
      switch (selectedSymbol.color) {
        case "#0673b6":
          newCount = redCounter + 1;
          setRedCounter(newCount);
          break;
        case "#99b669":
          newCount = greenCounter + 1;
          setGreenCounter(newCount);
          break;
        case "#ed1b98":
          newCount = blueCounter + 1;
          setBlueCounter(newCount);
          break;
        default:
          newCount = 0;
      }

      const imageRect = e.target.getBoundingClientRect();
      const posX = ((e.clientX - imageRect.left) / imageRect.width) * 100;
      const posY = ((e.clientY - imageRect.top) / imageRect.height) * 100;
      console.log("Position:", posX, posY);

      setSymbolsOnPlan((prevSymbols) => [
        ...prevSymbols,
        {
          ...selectedSymbol,
          id: `${symbolId}_${newCount}`,
          position: { x: posX, y: posY },
          number: newCount,
        },
      ]);
      setSelectedSymbol(null);
    }
  };

  const handleDeleteSymbolsOfType = (color) => () => {
    setSymbolsOnPlan((prevSymbols) =>
      prevSymbols.filter((symbol) => symbol.color !== color)
    );
    switch (color) {
      case "#0673b6":
        setRedCounter(0);
        break;
      case "#99b669":
        setGreenCounter(0);
        break;
      case "#ed1b98":
        setBlueCounter(0);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    const planData = {
      organization_id: selectedOrgId,
      name: data.name,
      image: data.image, // You might want to handle image uploading separately
      image_size: imageDimensions,
      markers: symbolsOnPlan.map((symbol) => ({
        type: symbol.name,
        x: symbol.position.x,
        y: symbol.position.y,
        counter: symbol.number,
      })),
    };

    console.log("Plan Data:", planData);
    //dispatch(createPlan(planData));
    try {
      const resultAction = await dispatch(createPlan(planData));
      console.log(resultAction, "resultAction");

      if (resultAction.type === "create/plan/fulfilled") {
        const message = resultAction.payload;
        console.log(message, "message");
        if (message === "Plan created successfully") {
          dispatch(setToastMessage("Plan created successfully"));
          toast.success("Plan created successfully");
        } else {
          toast.error("An unexpected response was received.");
        }
      } else {
        toast.error("An error occurred while adding the user.");
      }
    } catch (error) {
      toast.error("An error occurred: " + error.message);
    }
  };

  const toastMessage = localStorage.getItem("toastMessage");

   useEffect(() => {
     if (toastMessage) {
       toast.success(toastMessage);
       console.log("toastMessage", toastMessage);
       dispatch(clearToastMessage());
     }
   }, [toastMessage, dispatch]);

  return (
    <Box m="20px">
      <Header
        title="Build Your Organization's Plan"
        subtitle="Managing The Organizations"
      />

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          cursor: selectedSymbol ? "crosshair" : "default",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto",
          border: "2px solid black",
          borderRadius: "5px",
        }}
      >
        <input
          type="file"
          onChange={handleImageUpload}
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            zIndex: 10,
            opacity: 0 /* Hide the default input appearance */,
            width: 100 /* Adjust width as needed */,
            height: 40 /* Adjust height as needed */,
            cursor: "pointer" /* Show pointer cursor on hover */,
          }}
        />

        <Button
          startIcon={<DriveFolderUploadIcon />}
          htmlFor="file-input"
          sx={{
            position: "absolute",
            top: 10,
            left: 10,

            backgroundColor: "#FFD700",
            "&:hover": {
              bgcolor: "#FFB300",
            },
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Upload Image
        </Button>
        <TextField
          label="Plan Name"
          variant="outlined"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          style={{
            position: "absolute",
            top: 60,
            left: 500,
          }}
        />
        {image && (
          <div
            style={{
              position: "absolute",
              top: 110,
              left: 10,
              zIndex: 10,
              marginTop: "80px",
              border: "2px solid black",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "10px",
              marginRight: "10px",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <h3>Markers</h3>
            </div>
            {symbols.map((symbol) => (
              <div key={symbol.id} style={{ marginTop: "10px" }}>
                <Button
                  onClick={() => handleSymbolClick(symbol)}
                  variant="outlined"
                >
                  <symbol.Component
                    style={{ fontSize: 20, color: symbol.color }}
                  />
                </Button>
                <span style={{ marginLeft: "10px" }}>{symbol.name}</span>
              </div>
            ))}
          </div>
        )}
        {image && (
          <div style={{ position: "absolute", top: 10, right: 10, zIndex: 10 }}>
            <Button
              startIcon={<DeleteIcon />}
              variant="contained"
              sx={{
                backgroundColor: "#0673b6",
                "&:hover": {
                  backgroundColor: "#055a9a",
                },
                color: "#fff",
              }}
              onClick={handleDeleteSymbolsOfType("#0673b6")}
            >
              Delete (SS)
            </Button>
            <Button
              startIcon={<DeleteIcon />}
              variant="contained"
              onClick={handleDeleteSymbolsOfType("#99b669")}
              sx={{
                backgroundColor: "#99b669",
                "&:hover": {
                  backgroundColor: "#7e9655",
                },
                color: "#fff",
                marginLeft: "10px",
              }}
            >
              Delete (AS)
            </Button>
            <Button
              startIcon={<DeleteIcon />}
              onClick={handleDeleteSymbolsOfType("#ed1b98")}
              sx={{
                backgroundColor: "#ed1b98",
                "&:hover": {
                  backgroundColor: "#c31578",
                },
                color: "#fff",
                marginLeft: "10px",
              }}
            >
              Delete (THM)
            </Button>
          </div>
        )}
        {image && (
          <div
            ref={imageContainerRef}
            style={{
              position: "relative",
              marginLeft: "50px",
              width: imageDimensions.width
                ? `${imageDimensions.width}px`
                : "auto",
              height: imageDimensions.height
                ? `${imageDimensions.height}px`
                : "auto",
            }}
          >
            <img
              src={image}
              alt="Uploaded"
              onLoad={handleImageLoad}
              onClick={handleMouseClick}
              style={{
                maxWidth: "100%",
                height: "auto",
                cursor: "crosshair",
                border: "2px solid black",
                borderRadius: "5px",
              }}
            />
            {symbolsOnPlan.map((symbol) => (
              <Draggable
                key={symbol.id}
                bounds="parent"
                disabled

                //onStop={(e, data) => handleSymbolDragStop(e, data, symbol.id)}
              >
                <div
                  style={{
                    position: "absolute",
                    cursor: "move",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    left: `${symbol.position.x}%`,
                    top: `${symbol.position.y}%`,

                    //translate: "transform(-2px, -2px)",
                  }}
                >
                  <symbol.Component
                    style={{ fontSize: 20, color: symbol.color }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "16px",
                      pointerEvents: "none",
                    }}
                  >
                    {symbol.number}
                  </div>
                </div>
              </Draggable>
            ))}
          </div>
        )}
        <Button
          startIcon={<SaveIcon />}
          variant="contained"
          onClick={handleSubmit}
          sx={{
            position: "absolute",
            bottom: 10,
            right: 10,
            backgroundColor: "#007bff",
            "&:hover": {
              backgroundColor: "#0069d9",
            },
          }}
        >
          Save Plan
        </Button>
      </div>
      <Toaster position="bottom-right" richColors />
    </Box>
  );
};

export default Drg;
