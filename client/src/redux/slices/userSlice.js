import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userRegister = createAsyncThunk("admin/register", async (user) => {
  try {
    let response = await axios.post(
      "http://localhost:5000/admin/register",
      user
    );
    return await response;
  } catch (error) {
    console.log(error);
  }
});
export const userLogin = createAsyncThunk("user/login", async (user) => {
  try {
    let response = await axios.post("http://localhost:5000/user/login", user);
    return await response.data;
  } catch (error) {
    console.log(error);
  }
});
export const userCurrent = createAsyncThunk("user/current", async () => {
  try {
    let response = await axios.get("http://localhost:5000/user/current", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return await response;
  } catch (error) {
    console.log(error);
  }
});

export const updateUser = createAsyncThunk(
  "user/update",
  async ({ id, user }) => {
    try {
      let response = await axios.put(
        `http://localhost:5000/user/update/${id}`,
        user
      );
      return await response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const usersGet = createAsyncThunk("admin/get", async () => {
  try {
    let response = axios.get("http://localhost:5000/admin/get");
    return response;
  } catch (error) {
    console.log(error);
  }
});
export const usersDel = createAsyncThunk("user/delete", async (id) => {
  try {
    let result = axios.delete(`http://localhost:5000/user/${id}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  user: {},
  users: [],
  status: null,
  newuserupdated: {},
  userUpdated: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: {
    [userRegister.pending]: (state) => {
      state.status = "pending";
    },
    [userRegister.fulfilled]: (state, action) => {
      state.status = "success";
      state.user = action.payload.data?.newUserToken;
      localStorage.setItem("token", action.payload.token);
    },
    [userRegister.rejected]: (state) => {
      state.status = "fail";
    },
    [userLogin.pending]: (state) => {
      state.status = "pending";
    },
    [userLogin.fulfilled]: (state, action) => {
      state.status = "success";
      state.user = action.payload.user;
      localStorage.setItem("token", action.payload.token);
    },
    [userLogin.rejected]: (state) => {
      state.status = "fail";
    },
    [userCurrent.pending]: (state) => {
      state.status = "pending";
    },
    [userCurrent.fulfilled]: (state, action) => {
      state.status = "success";
      state.user = action.payload.data?.user;
    },
    [userCurrent.rejected]: (state) => {
      state.status = "fail";
    },
    [updateUser.pending]: (state) => {
      state.status = "pending";
    },
    [updateUser.fulfilled]: (state, action) => {
      state.userUpdated = action.payload.msg;
      state.newuserupdated = action.payload.newProfile;
      state.status = "success";
    },
    [updateUser.rejected]: (state) => {
      state.status = "fail";
    },
    [usersGet.pending]: (state) => {
      state.status = "pending";
    },
    [usersGet.fulfilled]: (state, action) => {
      state.status = "success";
      state.users = action.payload.data?.users;
    },
    [usersGet.rejected]: (state) => {
      state.status = "fail";
    },
    [usersDel.pending]: (state) => {
      state.status = "pending";
    },
    [usersDel.fulfilled]: (state) => {
      state.status = "success";
    },
    [usersDel.rejected]: (state) => {
      state.status = "fail";
    },
  },
});

// Action creators are generated for each case reducer function
export const { logout } = userSlice.actions;

export default userSlice.reducer;
