import { createSlice } from "@reduxjs/toolkit";
import {
  deleteUserFromOrg,
  findOrgsByUserId,
  findUnassignedOrgs,
  getOrgbyUserId,
} from "../actions/userOrg.action";

const initialState = {
  userOrgs: [],
  userOrganizations: [],
  unassignedOrgs: [],
  loading: false,
  error: null,
};
export const userOrgSlice = createSlice({
  name: "userOrgs",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //GET ORGANIZATIONS BY USER ID
    builder.addCase(findOrgsByUserId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findOrgsByUserId.fulfilled, (state, action) => {
      state.userOrgs = action.payload;
      state.loading = false;
    });
    builder.addCase(findOrgsByUserId.rejected, (state, action) => {
      state.userOrgs = {};
      state.loading = false;
      state.error = action.error.message;
    });

    //GET UNASSIGNED ORGANIZATIONS
    builder.addCase(findUnassignedOrgs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findUnassignedOrgs.fulfilled, (state, action) => {
      state.unassignedOrgs = action.payload;
      state.loading = false;
    });
    builder.addCase(findUnassignedOrgs.rejected, (state, action) => {
      state.unassignedOrgs = {};
      state.loading = false;
      state.error = action.error.message;
    });

    //delete user from organization
    builder.addCase(deleteUserFromOrg.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUserFromOrg.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteUserFromOrg.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    //GET ORGANIZATIONS BY USER ID
    builder.addCase(getOrgbyUserId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrgbyUserId.fulfilled, (state, action) => {
      state.userOrganizations = action.payload;
      state.loading = false;
    });
    builder.addCase(getOrgbyUserId.rejected, (state, action) => {
      state.userOrganizations = {};
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default userOrgSlice.reducer;
