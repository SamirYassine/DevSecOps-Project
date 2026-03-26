import React, { useEffect, useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import { FaSquare } from "react-icons/fa";
import { TbTriangleFilled } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { getPlan } from "../../redux/actions/plan.action";
import { apiBaseUrlImage } from "../../proxy";
import Header from "../../components/global/Header";
import { Box } from "@mui/material";

const PlanViewer = () => {
  const dispatch = useDispatch();
  const pl = useSelector((state) => state.plan.plan);
  const orgId = localStorage.getItem("selectedOrgId");
  const plan = pl[0];

  useEffect(() => {
    if (orgId) {
      dispatch(getPlan(orgId));
    }
  }, [dispatch, orgId]);

  const symbolComponents = {
    "Surface sampling (SS)": { component: CircleIcon, color: "#0673b6" },
    "Air sampling (AS)": { component: FaSquare, color: "#99b669" },
    "Temperature and humidity (THM)": {
      component: TbTriangleFilled,
      color: "#ed1b98",
    },
  };

  if (!plan) {
    return <div>Loading...</div>;
  }

  const imageUrl = `${apiBaseUrlImage}/${plan.image}`;

  return (
    <Box m="20px">
      <Header
        title="View Plan"
        subtitle="Reports with recommendations added by BCE Pharma Admins"
      />
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            marginTop: "0px",
            textAlign: "center",
            marginRight: "200px",
          }}
        >
          <h3>Legend</h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              border: "2px solid black",
              borderRadius: "5px",
              padding: "10px",
            }}
          >
            {Object.entries(symbolComponents).map(
              ([type, { component: SymbolComponent, color }]) => (
                <div
                  key={type}
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <SymbolComponent style={{ color: color, fontSize: 20 }} />
                  <span style={{ color: color, fontWeight: "bold" }}>
                    {type}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <img
            src={imageUrl}
            alt="Plan"
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
          {plan.markers.map((marker, index) => {
            const { component: SymbolComponent, color } =
              symbolComponents[marker.type];
            return (
              <div
                key={index}
                style={{
                  position: "absolute",
                  left: `${marker.x}%`,
                  top: `${marker.y}%`,
                  transform: "translate(-50%, -50%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 50,
                  height: 50,
                }}
              >
                <SymbolComponent style={{ fontSize: 20, color: color }} />
                <div
                  style={{
                    position: "absolute",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "16px",
                    pointerEvents: "none",
                  }}
                >
                  {marker.counter}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Box>
  );
};

export default PlanViewer;
