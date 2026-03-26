import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiBaseUrl } from "../../proxy";

export const addOrg = createAsyncThunk("add/org", async (data) => {
  try {
    const accessToken = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
    let response = await axios.post(
      `${apiBaseUrl}/add-organization`,
      data,
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const findOrgs = createAsyncThunk("orgs/all", async () => {
  try {
    const accessToken = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
    let response = await axios.get(`${apiBaseUrl}/organizations`, config);
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const updateOrganization = createAsyncThunk(
  "update/organization",
  async ({ data, id }) => {
    try {
      const accessToken = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
      const response = await axios.post(
        `${apiBaseUrl}/update-organization/${id}`,
        data,
        config
      );
      return response.data; // Return the response data
    } catch (error) {
      console.error("error:", error); // Log the error
      throw error; // Throw the error to trigger the rejection case
    }
  }
);

export const deleteOrganization = createAsyncThunk(
  "delete/organization",
  async (id) => {
    try {
      const accessToken = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
      const response = await axios.delete(
        `${apiBaseUrl}/delete-organization/${id}`,
        config
      );
      return response.data;
    } catch (error) {
      console.error("error:", error);
      throw error;
    }
  }
);

export const getOrganization = createAsyncThunk(
  "get/organization",
  async (id) => {
    try {
      const accessToken = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
      const response = await axios.get(
        `${apiBaseUrl}/get-organization/${id}`,
        config
      );
      return response;
    } catch (error) {
      console.error("error:", error);
      throw error;
    }
  }
);
