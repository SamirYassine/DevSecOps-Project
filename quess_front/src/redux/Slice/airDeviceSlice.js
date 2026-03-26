import { createSlice } from "@reduxjs/toolkit";
import {
  airDeviceRegister,
    getAllAirDevices,
    updateAirDevice,
} from "../actions/airDevice.action";

const initialState = {
  airDevice: {},
    airDevices: [],
  DeviceUpdate: [],
  loading: false,
  error: null,
};

const airDeviceSlice = createSlice({
  name: "airDevice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(airDeviceRegister.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(airDeviceRegister.fulfilled, (state, action) => {
      state.airDevice = action.payload;
      state.loading = false;
    });
    builder.addCase(airDeviceRegister.rejected, (state, action) => {
      state.airDevice = {};
      state.loading = false;
      state.error = action.error.message;
    });

    // get all air devices
    builder.addCase(getAllAirDevices.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllAirDevices.fulfilled, (state, action) => {
      state.airDevices = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllAirDevices.rejected, (state, action) => {
      state.airDevices = {};
      state.loading = false;
      state.error = action.error.message;
    });
    
      // update air device
      builder.addCase(updateAirDevice.pending, (state) => {
        state.loading = true;
      }
      );
        builder.addCase(updateAirDevice.fulfilled, (state, action) => {
            const updatedDevice = action.payload;
            if (Array.isArray(state.DeviceUpdate)) {
        const index = state.DeviceUpdate.findIndex(
          (device) => device.id === updatedDevice.id
        );
        if (index !== -1) {
          state.DeviceUpdate[index] = updatedDevice;
        }
      } else {
        state.DeviceUpdate = [updatedDevice];
      }
      state.loading = false;
    });
            
    builder.addCase(updateAirDevice.rejected, (state, action) => {
      state.DeviceUpdate = {};
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default airDeviceSlice.reducer;
