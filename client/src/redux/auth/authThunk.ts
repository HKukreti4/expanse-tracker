import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";
import axios from "axios";

// Define input and output types
interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}
interface loginPayload {
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}
interface getInfoData {
  email: string;
  id?: string;
  token?: string;
}

interface RegisterResponse {
  success: boolean;
  message: string;
  user: User;
  token?: string;
}

// Async thunk
export const registerUserThunk = createAsyncThunk<
  User, // ✅ Return type (what you return from the thunk)
  RegisterPayload, // ✅ Argument type (what you pass into the thunk)
  {
    rejectValue: string; // ✅ rejectWithValue type
  }
>("user/register", async (userData, { rejectWithValue }) => {
  try {
    const result = await axiosInstance.post<RegisterResponse>(
      "/auth/register",
      userData
    );
    const payload = { ...result.data.user, token: result.data.token };
    return payload;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const msg = error?.response?.data?.message;
      return rejectWithValue(msg || "Failed to register");
    }
    return rejectWithValue("Failed to register");
  }
});
export const loginUserThunk = createAsyncThunk<
  User, // ✅ Return type (what you return from the thunk)
  loginPayload, // ✅ Argument type (what you pass into the thunk)
  {
    rejectValue: string; // ✅ rejectWithValue type
  }
>("user/login", async (userData, { rejectWithValue }) => {
  try {
    const result = await axiosInstance.post<RegisterResponse>(
      "/auth/login",
      userData
    );
    const loggedInuser = {
      ...result.data.user,
      token: result.data.token,
    };
    return loggedInuser;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const msg = error?.response?.data?.message;
      return rejectWithValue(msg || "Failed to Login");
    }
    return rejectWithValue("Failed to login");
  }
});

export const getUserThunk = createAsyncThunk<
  User, // ✅ Return type (what you return from the thunk)
  getInfoData, // ✅ Argument type (what you pass into the thunk)
  {
    rejectValue: string; // ✅ rejectWithValue type
  }
>("user/info", async (userData, { rejectWithValue }) => {
  try {
    const { token } = userData;
    if (!token) return rejectWithValue("token is missing login again");
    const result = await axiosInstance.get<RegisterResponse>("/auth/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const newuserData = { ...result.data.user, token: result.data.token };
    return newuserData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const msg = error?.response?.data?.message;
      return rejectWithValue(msg || "Failed to get user");
    }
    return rejectWithValue("something went wrong");
  }
});
