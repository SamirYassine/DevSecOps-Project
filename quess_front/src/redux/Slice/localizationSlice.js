import { createSlice } from "@reduxjs/toolkit";
import { getLocalizationsByZone } from "../actions/localization.action";

const initialState = {
  localizations: [],
  loading: false,
  error: null,
};

const localizationSlice = createSlice({
  name: "localization",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get localizations by zone
    builder.addCase(getLocalizationsByZone.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getLocalizationsByZone.fulfilled, (state, action) => {
      console.log(action.payload.data, "localizations");
      state.localizations = action.payload.data; // Set localizations directly
      state.loading = false;
    });
    builder.addCase(getLocalizationsByZone.rejected, (state, action) => {
      state.localizations = [];
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default localizationSlice.reducer;
