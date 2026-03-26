import { createSlice } from "@reduxjs/toolkit";
import {
  userLogin,
  userRegister,
  findusers,
  updateUser,
  deleteUser,
  getRole,
  getUsersByOrgId,
  getUserr,
} from "../actions/user.action";
const initialState = {
  user: {},
  users: [],
  loading: false,
  error: null,
  isAuth: false,
  userUpdate: [],
};
export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //REGISTER
    builder.addCase(userRegister.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userRegister.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(userRegister.rejected, (state, action) => {
      state.user = {};
      state.loading = false;
      state.error = action.error.message;
    });

    //lOGIN
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.isAuth = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      //save the user in the state
      state.user = action.payload;
      state.loading = false;
      state.isAuth = true;

      // save the token in the local storage
      if (action?.payload?.data?.token) {
        localStorage.setItem("token", action?.payload?.data?.token);
      } else {
        localStorage.removeItem("token");
      }
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.user = {};
      state.loading = false;
      state.isAuth = false;
      state.error = action.error.message;
    });

    //GET ALL USERS
    builder.addCase(findusers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findusers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });
    builder.addCase(findusers.rejected, (state, action) => {
      state.users = {};
      state.loading = false;
      state.error = action.error.message;
    });

    //Update user
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const updatedUser = action.payload;
      if (Array.isArray(state.userUpdate)) {
        const index = state.userUpdate.findIndex(
          (user) => user.id === updatedUser.id
        );
        if (index !== -1) {
          state.userUpdate[index] = updatedUser;
        }
      } else {
        state.userUpdate = [updatedUser];
      }
      state.loading = false;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.userUpdate = {};
      state.loading = false;
      state.error = action.error.message;
    });

    //delete User
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    //get role
    builder.addCase(getRole.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getRole.fulfilled, (state, action) => {
      state.role = action.payload;
      state.loading = false;
    });
    builder.addCase(getRole.rejected, (state, action) => {
      state.role = {};
      state.loading = false;
      state.error = action.error.message;
    });

    //get users by org 
    builder.addCase(getUsersByOrgId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUsersByOrgId.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });
    builder.addCase(getUsersByOrgId.rejected, (state, action) => {
      state.users = {};
      state.loading = false;
      state.error = action.error.message;
    });

    // get userr
    builder.addCase(getUserr.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserr.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(getUserr.rejected, (state, action) => {
      state.user = {};
      state.loading = false;
      state.error = action.error.message;
    });

  },
});
export default userSlice.reducer;
