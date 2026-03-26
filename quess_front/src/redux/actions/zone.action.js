import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiBaseUrl } from "../../proxy";

export const getAirZonesByOrganizationId = createAsyncThunk(
  "get/airZonesByOrgId",
  async (orgId) => {
    try {
      const accessToken = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
      let response = await axios.get(
        `${apiBaseUrl}/air-zones/${orgId}`,
        config
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getSurfaceZonesByOrganizationId = createAsyncThunk(
  "get/surfaceZonesByOrgId",
  async (orgId) => {
    try {
      const accessToken = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
      let response = await axios.get(
        `${apiBaseUrl}/surface-zones/${orgId}`,
        config
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getZonesByOrganizationId = createAsyncThunk(
  "get/zonesByOrgId",
  async (orgId) => {
    try {
      const accessToken = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
      let response = await axios.get(`${apiBaseUrl}/zones/${orgId}`, config);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

// get all zones
// export const getAllZones = createAsyncThunk("get/allZones", async () => {
//   try {
//     const accessToken = localStorage.getItem("token");
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: accessToken ? `Bearer ${accessToken}` : "",
//       },
//     };
//     let response = await axios.get(`${apiBaseUrl}/zones`, config);
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// });

// create zone
export const createZone = createAsyncThunk("create/zone", async (data) => {
  try {
    const accessToken = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
    let response = await axios.post(`${apiBaseUrl}/create-zone`, data, config);
    return response;
  } catch (error) {
    console.log(error);
  }
});

// update zone
export const updateZone = createAsyncThunk("update/zone", async (data) => {
  try {
    const accessToken = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
    let response = await axios.put(`${apiBaseUrl}/update-zone`, data, config);
    return response;
  } catch (error) {
    console.log(error);
  }
});
