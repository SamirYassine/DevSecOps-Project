import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiBaseUrl } from "../../proxy";

export const getLocalizationsByZone = createAsyncThunk(
  "get/localizationsByZone",
  async (zoneId) => {
    try {
      const accessToken = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
      let response = await axios.get(
        `${apiBaseUrl}/localizations/zone/${zoneId}`,
        config
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);


