import { createSlice } from "@reduxjs/toolkit";
import {
  createAirForm,
  getAirTemplates,
  fillAirForm,
  createSurfaceForm,
  getSurfaceForms,
  fillSurfaceForm,
  getSurfaceFormsForReport,
  getAirFormsForReport,
  getCompletedSurfaceReports,
  getCompletedAirReports,
  getPendingSurfaceReports,
  getPendingAirReports,
  getValidatedAirReports,
  getValidatedSurfaceReports,
} from "../actions/form.action";

const initialState = {
  form: {},
  forms: [],
  airForms: [],
  surfaceForms: [],
  loading: false,
  error: null,
};

const formSlice = createSlice({
  name: "form",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //create air form
    builder.addCase(createAirForm.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createAirForm.fulfilled, (state, action) => {
      state.form = action.payload;
      state.loading = false;
    });
    builder.addCase(createAirForm.rejected, (state, action) => {
      state.form = {};
      state.loading = false;
      state.error = action.error.message;
    });

    //getAirTemplates

    builder.addCase(getAirTemplates.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAirTemplates.fulfilled, (state, action) => {
      state.forms = action.payload;
      state.loading = false;
    });
    builder.addCase(getAirTemplates.rejected, (state, action) => {
      state.forms = {};
      state.loading = false;
      state.error = action.error.message;
    });

    //  fillAirForm
    builder.addCase(fillAirForm.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fillAirForm.fulfilled, (state, action) => {
      state.form = action.payload;
      state.loading = false;
    });
    builder.addCase(fillAirForm.rejected, (state, action) => {
      state.form = {};
      state.loading = false;
      state.error = action.error.message;
    });

    // create surface form
    builder.addCase(createSurfaceForm.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createSurfaceForm.fulfilled, (state, action) => {
      state.form = action.payload;
      state.loading = false;
    });
    builder.addCase(createSurfaceForm.rejected, (state, action) => {
      state.form = {};
      state.loading = false;
      state.error = action.error.message;
    });

    // get surface forms
    builder.addCase(getSurfaceForms.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSurfaceForms.fulfilled, (state, action) => {
      state.forms = action.payload;
      state.loading = false;
    });
    builder.addCase(getSurfaceForms.rejected, (state, action) => {
      state.forms = {};
      state.loading = false;
      state.error = action.error.message;
    });

    // fillSurfaceForm
    builder.addCase(fillSurfaceForm.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fillSurfaceForm.fulfilled, (state, action) => {
      state.form = action.payload;
      state.loading = false;
    });
    builder.addCase(fillSurfaceForm.rejected, (state, action) => {
      state.form = {};
      state.loading = false;
      state.error = action.error.message;
    });

    // get surface forms for report generation
    builder.addCase(getSurfaceFormsForReport.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSurfaceFormsForReport.fulfilled, (state, action) => {
      state.surfaceForms = action.payload.data;
      state.loading = false;
    });
    builder.addCase(getSurfaceFormsForReport.rejected, (state, action) => {
      state.surfaceForms = {};
      state.loading = false;
      state.error = action.error.message;
    });

    // get air forms for report generation
    builder.addCase(getAirFormsForReport.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAirFormsForReport.fulfilled, (state, action) => {
      state.airForms = action.payload.data;
      state.loading = false;
    });
    builder.addCase(getAirFormsForReport.rejected, (state, action) => {
      state.airForms = {};
      state.loading = false;
      state.error = action.error.message;
    });

    // get Completed Air Reports
    builder.addCase(getCompletedAirReports.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCompletedAirReports.fulfilled, (state, action) => {
      state.airForms = action.payload.data;
      state.loading = false;
    });
    builder.addCase(getCompletedAirReports.rejected, (state, action) => {
      state.airForms = {};
      state.loading = false;
      state.error = action.error.message;
    });

    //get Completed Surface Reports
    builder.addCase(getCompletedSurfaceReports.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCompletedSurfaceReports.fulfilled, (state, action) => {
      state.surfaceForms = action.payload.data;
      state.loading = false;
    });
    builder.addCase(getCompletedSurfaceReports.rejected, (state, action) => {
      state.surfaceForms = {};
      state.loading = false;
      state.error = action.error.message;
    });

    //get all surface forms with status 0
    builder.addCase(getPendingSurfaceReports.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPendingSurfaceReports.fulfilled, (state, action) => {
      state.surfaceForms = action.payload.data;
      state.loading = false;
    });
    builder.addCase(getPendingSurfaceReports.rejected, (state, action) => {
      state.surfaceForms = {};
      state.loading = false;
      state.error = action.error.message;
    });

    //get all air forms with status 0
    builder.addCase(getPendingAirReports.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPendingAirReports.fulfilled, (state, action) => {
      state.airForms = action.payload.data;
      state.loading = false;
    });
    builder.addCase(getPendingAirReports.rejected, (state, action) => {
      state.airForms = {};
      state.loading = false;
      state.error = action.error.message;
    });

    //get all air forms with status 1
    builder.addCase(getValidatedAirReports.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getValidatedAirReports.fulfilled, (state, action) => {
      state.airForms = action.payload.data;
      state.loading = false;
    });
    builder.addCase(getValidatedAirReports.rejected, (state, action) => {
      state.airForms = {};
      state.loading = false;
      state.error = action.error.message;
    });

    //get all surface forms with status 1
    builder.addCase(getValidatedSurfaceReports.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getValidatedSurfaceReports.fulfilled, (state, action) => {
      state.surfaceForms = action.payload.data;
      state.loading = false;
    });
    builder.addCase(getValidatedSurfaceReports.rejected, (state, action) => {
      state.surfaceForms = {};
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default formSlice.reducer;
