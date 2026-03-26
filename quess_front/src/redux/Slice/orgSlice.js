import { createSlice } from "@reduxjs/toolkit";
import {
  addOrg,
  deleteOrganization,
  findOrgs,
  getOrganization,
  updateOrganization,
} from "../actions/org.action";
import { findOrgsByUserId } from "../actions/userOrg.action";

const initialState = {
  org: {},
  orgs: [],
  //userOrgs: [],
  loading: false,
  error: null,
  orgUpdate: [],
};

export const orgSlice = createSlice({
  name: "org",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //REGISTER
    builder.addCase(addOrg.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addOrg.fulfilled, (state, action) => {
      state.org = action.payload;
      state.loading = false;
    });
    builder.addCase(addOrg.rejected, (state, action) => {
      state.org = {};
      state.loading = false;
      state.error = action.error.message;
    });

    //GET ALL ORGANIZATIONS
    builder.addCase(findOrgs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findOrgs.fulfilled, (state, action) => {
      state.orgs = action.payload;
      state.loading = false;
    });
    builder.addCase(findOrgs.rejected, (state, action) => {
      state.orgs = {};
      state.loading = false;
      state.error = action.error.message;
    });
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

    //update org
    builder.addCase(updateOrganization.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateOrganization.fulfilled, (state, action) => {
      const updatedOrganization = action.payload;

      if (Array.isArray(state.orgUpdate)) {
        const index = state.orgUpdate.findIndex(
          (org) => org.id === updatedOrganization.id
        );
        if (index !== -1) {
          state.orgUpdate[index] = updatedOrganization;
        }
      } else {
        state.orgUpdate = [updatedOrganization];
      }
      state.loading = false;
    });
    builder.addCase(updateOrganization.rejected, (state, action) => {
      state.orgUpdate = [];
      state.loading = false;
      state.error = action.error.message;
    });

    //delete org
    builder.addCase(deleteOrganization.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteOrganization.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteOrganization.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    //get org by id
    builder.addCase(getOrganization.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrganization.fulfilled, (state, action) => {
      state.org = action.payload;
      state.loading = false;
    });
    builder.addCase(getOrganization.rejected, (state, action) => {
      state.org = {};
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default orgSlice.reducer;
