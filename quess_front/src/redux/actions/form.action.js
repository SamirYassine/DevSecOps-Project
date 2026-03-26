import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiBaseUrl } from "../../proxy";
import { useDispatch } from "react-redux";
import { setToastMessage } from "../Slice/toastSlice";

export const createAirForm = createAsyncThunk(
  "create/Airform",
  async (data) => {
    try {
      const accessToken = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
      let response = await axios.post(`${apiBaseUrl}/air/create`, data, config);

      if (response.data.payload === "Air created successfully") {
        const dispatch = useDispatch();
        dispatch(setToastMessage("Air created successfully"));
      }

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAirTemplates = createAsyncThunk("get/AIRForms", async (id) => {
  try {
    const accessToken = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
    let response = await axios.get(`${apiBaseUrl}/airs/${id}`, config);
    return response;
  } catch (error) {
    console.log(error);
  }
});

// fill Air form

export const fillAirForm = createAsyncThunk(
  "fill/Airform",
  async ({ data, id }) => {
    try {
      const accessToken = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
      let response = await axios.post(
        `${apiBaseUrl}/air/fill/${id}`,
        data,
        config
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// create Surface form
export const createSurfaceForm = createAsyncThunk(
  "create/Surfaceform",
  async (data) => {
    try {
      const accessToken = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
      let response = await axios.post(
        `${apiBaseUrl}/surface/create`,
        data,
        config
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// get Surface forms
export const getSurfaceForms = createAsyncThunk(
  "get/SurfaceForms",
  async (id) => {
    try {
      const accessToken = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
      let response = await axios.get(`${apiBaseUrl}/surfaces/${id}`, config);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

// fill Surface form
export const fillSurfaceForm = createAsyncThunk(
  "fill/Surfaceform",
  async ({ data, id }) => {
    try {
      const accessToken = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
      let response = await axios.post(
        `${apiBaseUrl}/surface/fill/${id}`,
        data,
        config
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

//get surface forms for report generation
export const getSurfaceFormsForReport = createAsyncThunk(
  "get/SurfaceFormsForReport",
  async (id) => {
    try {
      const accessToken = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
      let response = await axios.get(
        `${apiBaseUrl}/surfaceforms/${id}`,
        config
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

//get air forms for report generation
export const getAirFormsForReport = createAsyncThunk(
  "get/AirFormsForReport",
  async (id) => {
    try {
      const accessToken = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
      let response = await axios.get(`${apiBaseUrl}/airforms/${id}`, config);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

//get Completed Air Reports

export const getCompletedAirReports = createAsyncThunk(
  "get/completedAirReports",
  async (id) => {
    try {
      const accessToken = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
      let response = await axios.get(
        `${apiBaseUrl}/completedAirReports/${id}`,
        config
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

// get Completed Surface Reports
export const getCompletedSurfaceReports = createAsyncThunk(
  "get/completedSurfaceReports",
  async (id) => {
    try {
      const accessToken = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
      let response = await axios.get(
        `${apiBaseUrl}/completedSurfaceReports/${id}`,
        config
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

//get pending Air Reports
export const getPendingAirReports = createAsyncThunk(
  "get/pendingAirReports",
  async () => {
    try {
      const accessToken = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
      let response = await axios.get(`${apiBaseUrl}/pendingAirReports`, config);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getPendingSurfaceReports = createAsyncThunk(
  "get/pendingSurfaceReports",
  async () => {
    try {
      const accessToken = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
      let response = await axios.get(
        `${apiBaseUrl}/pendingSurfaceReports`,
        config
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

// get all surface forms with status 1
export const getValidatedSurfaceReports = createAsyncThunk(
  "get/validatedSurfaceReports",
  async () => {
    try {
      const accessToken = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
      let response = await axios.get(
        `${apiBaseUrl}/validatedSurfaceReports`,
        config
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

// get all air forms with status 1
export const getValidatedAirReports = createAsyncThunk(
  "get/validatedAirReports",
  async () => {
    try {
      const accessToken = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
      let response = await axios.get(
        `${apiBaseUrl}/validatedAirReports`,
        config
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
