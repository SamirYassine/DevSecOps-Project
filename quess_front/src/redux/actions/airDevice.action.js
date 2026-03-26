import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiBaseUrl } from "../../proxy";

export const airDeviceRegister = createAsyncThunk(
  "register/airDevice",
  async (data) => {
    try {
      const accessToken = localStorage.getItem("token");
      //kenet blech config
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
      let response = await axios.post(
        `${apiBaseUrl}/air_sampler_settings/create`,
        data,
        config
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// get all air devices
export const getAllAirDevices = createAsyncThunk(
  "get/airDevices",
  async (OrgId) => {
    try {
      const accessToken = localStorage.getItem("token");
      //kenet blech config
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
      let response = await axios.get(
        `${apiBaseUrl}/air_sampler_settings/organization/${OrgId}`,
        config
      );
      console.log(response.data);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

// update air device
export const updateAirDevice = createAsyncThunk(
  "update/airDevice",
  async ({ data, id }) => {
    try {
      const accessToken = localStorage.getItem("token");
      //kenet blech config
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
      let response = await axios.put(
        `${apiBaseUrl}/air_sampler_settings/update/${id}`,
        data,
        config
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
