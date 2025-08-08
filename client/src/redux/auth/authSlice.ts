import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getUserThunk, loginUserThunk, registerUserThunk } from "./authThunk";

// Define user structure returned from the API
export interface User {
  id: string;
  name: string;
  email: string;

  // Add more fields if your API returns them
}

export interface AuthState {
  user: User | null;
  errmsg: string;
  buttonLoading: boolean;
  token?: string;
  isAuthenticated: boolean;
}
const initialState: AuthState = {
  user: (() => {
    try {
      const stored = sessionStorage.getItem("user");
      return stored ? (JSON.parse(stored) as User) : null;
    } catch {
      return null;
    }
  })(),
  errmsg: "",
  buttonLoading: false,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //register thunk
    builder.addCase(registerUserThunk.pending, (state) => {
      state.buttonLoading = true;
      state.errmsg = "";
    });
    builder.addCase(
      registerUserThunk.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.buttonLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      }
    );
    builder.addCase(registerUserThunk.rejected, (state, action) => {
      state.buttonLoading = false;
      state.errmsg = (action.payload as string) || "Something went wrong";
    });
    //login thunk
    builder.addCase(loginUserThunk.pending, (state) => {
      state.buttonLoading = true;
      state.errmsg = "";
    });
    builder.addCase(
      loginUserThunk.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.buttonLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        const userData = action.payload;
        sessionStorage.setItem("user", JSON.stringify(userData));
      }
    );
    builder.addCase(loginUserThunk.rejected, (state, action) => {
      state.buttonLoading = false;
      state.errmsg = (action.payload as string) || "Something went wrong";
    });
    // get user thunk
    builder.addCase(getUserThunk.pending, (state) => {
      state.user = null;
    });
    builder.addCase(
      getUserThunk.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.buttonLoading = false;
        state.user = action.payload;
        const userData = action.payload;
        state.isAuthenticated = true;
        sessionStorage.setItem("user", JSON.stringify(userData));
      }
    );
    builder.addCase(getUserThunk.rejected, (state, action) => {
      state.errmsg = (action.payload as string) || "Invalid user";
    });
  },
});

// export const {} = authSlice.actions;
export default authSlice.reducer;
