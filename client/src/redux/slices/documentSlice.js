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

  status: "",
};
export const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {},
  extraReducers: {
    [addDoc.pending]: (state) => {
      state.status = "pending";
    },
    [addDoc.fulfilled]: (state) => {
      state.status = "fulfilled";
    },
    [addDoc.failed]: (state) => {
      state.status = "failed";
    },
    [allDocs.pending]: (state) => {
      state.status = "pending";
    },
    [allDocs.fulfilled]: (state, action) => {
      state.status = "success";
      state.docs = action.payload?.data.document;
    },
    [allDocs.rejected]: (state) => {
      state.status = "fail";
    },
    [docUser.pending]: (state) => {
      state.status = "pending";
    },
    [docUser.fulfilled]: (state, action) => {
      state.status = "success";
      state.userDocs = action.payload?.documentUser;
    },
    [docUser.rejected]: (state) => {
      state.status = "fail";
    },
  },
});

export default documentSlice.reducer;
