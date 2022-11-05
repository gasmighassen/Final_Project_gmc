import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addDoc = createAsyncThunk("document/adddoc", async (doc) => {
  try {
    let response = await axios.post(
      "http://localhost:5000/document/adddoc",
      doc
    );
    return await response.data;
  } catch (error) {
    console.log(error);
  }
});
export const allDocs = createAsyncThunk("document/alldoc", async () => {
  try {
    let result = await axios.get("http://localhost:5000/document/alldoc");
    return result;
  } catch (error) {
    console.log(error);
  }
});
export const docUser = createAsyncThunk("document/userdocs", async (id) => {
  try {
    let result = await axios.get(
      `http://localhost:5000/document/userdocs/${id}`
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
});
const initialState = {
  docs: [],
  userDocs: [],
  isLoading: false,
  status: "",
};
export const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {},
  extraReducers: {
    [addDoc.pending]: (state) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [addDoc.fulfilled]: (state) => {
      state.status = "fulfilled";
      state.isLoading = false;
    },
    [addDoc.failed]: (state) => {
      state.status = "failed";
      state.isLoading = false;
    },
    [allDocs.pending]: (state) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [allDocs.fulfilled]: (state, action) => {
      state.status = "success";
      state.docs = action.payload?.data.document;
      state.isLoading = false;
    },
    [allDocs.rejected]: (state) => {
      state.status = "fail";
      state.isLoading = false;
    },
    [docUser.pending]: (state) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [docUser.fulfilled]: (state, action) => {
      state.status = "success";
      state.userDocs = action.payload?.documentUser;
      state.isLoading = false;
    },
    [docUser.rejected]: (state) => {
      state.status = "fail";
      state.isLoading = false;
    },
  },
});

export default documentSlice.reducer;
