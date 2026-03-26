import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiBaseUrl } from "../../proxy";
import ReviseReports from "../../pages/reports/ReviseReports";

export const generateReport = createAsyncThunk(
  "generate/report",
  async ({ formType, id }) => {
    try {
      console.log(id, formType, "id, formType");
      const accessToken = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
      let response = await axios.post(
        `${apiBaseUrl}/pdf/${id}`,
        formType,
        config
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const reviseReport = createAsyncThunk(
  "revise/report",
  async ({ dataform, id }) => {
    try {
      console.log(id, dataform, "id, formType");
      const accessToken = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
      let response = await axios.post(
        `${apiBaseUrl}/revise-report/${id}`,
        dataform,
        config
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const generateRevisedReport = createAsyncThunk(
  "generate/revisedReport",
  async ({ formType, id }) => {
    try {
      console.log(id, formType, "id, formType");
      const accessToken = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
      let response = await axios.post(
        `${apiBaseUrl}/generate--revised-report/${id}`,
        formType,
        config
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
