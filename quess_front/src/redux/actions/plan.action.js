import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiBaseUrl } from "../../proxy";

export const createPlan = createAsyncThunk("create/plan", async (data) => {
  try {
    const accessToken = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
    let response = await axios.post(`${apiBaseUrl}/create-plan`, data, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const getPlan = createAsyncThunk("get/plan", async (orgId) => {
  try {
    const accessToken = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
    let response = await axios.get(`${apiBaseUrl}/get-plan/${orgId}`, config);
    return response;
  } catch (error) {
    console.log(error);
  }
});

