import { createSlice } from "@reduxjs/toolkit";
import {
  getAirZonesByOrganizationId,
  getAllZones,
  createZone,
  getSurfaceZonesByOrganizationId,
  getZonesByOrganizationId,
} from "../actions/zone.action";

const initialState = {
  zone: {},
  zones: [],
  loading: false,
  error: null,
};

const zoneSlice = createSlice({
  name: "zone",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get air zones by organization id
    builder.addCase(getAirZonesByOrganizationId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAirZonesByOrganizationId.fulfilled, (state, action) => {
      state.zones = action.payload.data;
      state.loading = false;
    });
    builder.addCase(getAirZonesByOrganizationId.rejected, (state, action) => {
      state.zones = [];
      state.loading = false;
      state.error = action.error.message;
    });

    // get air zones by organization id
    builder.addCase(getSurfaceZonesByOrganizationId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getSurfaceZonesByOrganizationId.fulfilled,
      (state, action) => {
        state.zones = action.payload.data;
        state.loading = false;
      }
    );
    builder.addCase(
      getSurfaceZonesByOrganizationId.rejected,
      (state, action) => {
        state.zones = [];
        state.loading = false;
        state.error = action.error.message;
      }
    );

    // get air zones by organization id
    builder.addCase(getZonesByOrganizationId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getZonesByOrganizationId.fulfilled, (state, action) => {
      state.zones = action.payload.data;
      state.loading = false;
    });
    builder.addCase(getZonesByOrganizationId.rejected, (state, action) => {
      state.zones = [];
      state.loading = false;
      state.error = action.error.message;
    });

    // get all zones
    // builder.addCase(getAllZones.pending, (state) => {
    //   state.loading = true;
    // });
    // builder.addCase(getAllZones.fulfilled, (state, action) => {
    //   state.zones = action.payload;
    //   state.loading = false;
    // });
    // builder.addCase(getAllZones.rejected, (state, action) => {
    //   state.zones = [];
    //   state.loading = false;
    //   state.error = action.error.message;
    // });

    // create zone
    builder.addCase(createZone.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createZone.fulfilled, (state, action) => {
      state.zone = action.payload;
      state.loading = false;
    });
    builder.addCase(createZone.rejected, (state, action) => {
      state.zone = [];
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default zoneSlice.reducer;
