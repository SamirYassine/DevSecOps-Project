import { createSlice } from "@reduxjs/toolkit";
import { createPlan, getPlan } from "../actions/plan.action";

const initialState = {
  plan: {},
  plans: [],
  loading: false,
  error: null,
};

export const planSlice = createSlice({
  name: "plan",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //REGISTER
    builder.addCase(createPlan.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createPlan.fulfilled, (state, action) => {
      state.plan = action.payload;
      state.loading = false;
    });
    builder.addCase(createPlan.rejected, (state, action) => {
      state.plan = {};
      state.loading = false;
      state.error = action.error.message;
    });

    //Get plan
    builder.addCase(getPlan.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPlan.fulfilled, (state, action) => {
      state.plan = action.payload.data;
      state.loading = false;
    });
    builder.addCase(getPlan.rejected, (state, action) => {
      state.plan = [];
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default planSlice.reducer;
