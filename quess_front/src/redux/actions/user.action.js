import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiBaseUrl } from "../../proxy";

export const userRegister = createAsyncThunk("register/user", async (data) => {
  try {
    const accessToken = localStorage.getItem("token");
    //kenet blech config
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
    let response = await axios.post(`${apiBaseUrl}/add-user`, data, config);
    //console.log("response", response.data);
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
//Consomi API
//Console log turbo ctrl+alt+L
export const userLogin = createAsyncThunk("login/user", async (login) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    let response = await axios.post(`${apiBaseUrl}/login_check`, login, config);
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const getUserr = createAsyncThunk("get/user", async () => {
  try {
    const accessToken = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
    let response = await axios.get(`${apiBaseUrl}/get-user`, config);
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const finduserbyid = createAsyncThunk("user/id", async (id) => {
  try {
    const accessToken = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
    let response = await axios.post(`${apiBaseUrl}/user/`, id, config);
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const findusers = createAsyncThunk("users/all", async () => {
  try {
    const accessToken = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
    let response = await axios.get(`${apiBaseUrl}/users`, config);
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const getUsersByOrgId = createAsyncThunk("users/org", async () => {
  try {
    const accessToken = localStorage.getItem("token");
    const orgId = localStorage.getItem("selectedOrgId");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
      params: {
        selectedOrgId: orgId,
      },
    };
    let response = await axios.get(`${apiBaseUrl}/users-by-org`, config);
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const updateUser = createAsyncThunk(
  "update/user",
  async ({ formData, id }) => {
    try {
      const accessToken = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
      let response = await axios.put(
        `${apiBaseUrl}/update-user/${id}`,
        formData,
        config
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteUser = createAsyncThunk("delete/user", async (id) => {
  try {
    const accessToken = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
    let response = await axios.delete(
      `${apiBaseUrl}/delete-user/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

//get role by user and selectedOrgId
export const getRole = createAsyncThunk("get/user/role", async () => {
  try {
    const accessToken = localStorage.getItem("token");
    const orgId = localStorage.getItem("selectedOrgId");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
      params: {
        selectedOrgId: orgId,
      },
    };

    let response = await axios.get(`${apiBaseUrl}/get-user-role`, config);
    //console.log("response", response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error; // Ensure the error is thrown to handle it in Redux
  }
});
