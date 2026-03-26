import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiBaseUrl } from "../../proxy";

export const findOrgsByUserId = createAsyncThunk("orgs/user", async (id) => {
  try {
    const accessToken = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
    let response = await axios.get(
      `${apiBaseUrl}/get-orgs-by-user/${id}`,
      config
    );
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const findUnassignedOrgs = createAsyncThunk(
  "orgs/unassigned",
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
        `${apiBaseUrl}/get-unassigned-orgs/${id}`,
        config
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteUserFromOrg = createAsyncThunk(
  "userorg/delete",
  async ({ orgId, userId }) => {
    try {
      const accessToken = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
      const response = await axios.delete(
        `${apiBaseUrl}/delete-user-from-org/${userId}/${orgId}`,
        config
      );
      return response.data; // Assuming the response contains the data you want to return
    } catch (error) {
      console.log(error);
      throw error; // Rethrow the error so it can be handled by the Redux thunk
    }
  }
);

export const getOrgbyUserId = createAsyncThunk("orgss/user", async () => {
  try {
    const accessToken = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
    const response = await axios.get(`${apiBaseUrl}/get-orgs-by-user`, config);
    //console.log(response.data, "response");
    return response.data; // Assuming the response contains the data you want to return
  } catch (error) {
    console.log(error);
    throw error; // Rethrow the error so it can be handled by the Redux thunk
  }
});
