import { createSlice } from "@reduxjs/toolkit";
import { generateReport, generateRevisedReport, reviseReport } from "../actions/report.action";

const initialState = {
  report: {},
  loading: false,
  error: null,
};

export const reportSlice = createSlice({
  name: "report",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //generate report
    builder.addCase(generateReport.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(generateReport.fulfilled, (state, action) => {
      state.report = action.payload;
      state.loading = false;
    });
    builder.addCase(generateReport.rejected, (state, action) => {
      state.report = {};
      state.loading = false;
      state.error = action.error.message;
    });

    //revise report
    builder.addCase(reviseReport.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(reviseReport.fulfilled, (state, action) => {
      state.report = action.payload;
      state.loading = false;
    });
    builder.addCase(reviseReport.rejected, (state, action) => {
      state.report = {};
      state.loading = false;
      state.error = action.error.message;
    });

    //generate revised report
    builder.addCase(generateRevisedReport.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(generateRevisedReport.fulfilled, (state, action) => {
      state.report = action.payload;
      state.loading = false;
    });
    builder.addCase(generateRevisedReport.rejected, (state, action) => {
      state.report = {};
      state.loading = false;
      state.error = action.error.message;
    });

  },
});

export default reportSlice.reducer;
