import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addService = createAsyncThunk(
  "services/addservice",
  async (service) => {
    try {
      let response = await axios.post(
        "http://localhost:5000/services/addservice",
        service
      );
      return await response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const addServiceFile = createAsyncThunk(
  "files/addservicefiles",
  async (file) => {
    try {
      console.log(file);
      let response = await axios.post(
        "http://localhost:5000/files/addservicefiles",
        file
      );
      return await response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
// update files
export const addFile = createAsyncThunk(
  "files/addfile/:id",
  async (file, id) => {
    try {
      let response = await axios.put(
        `http://localhost:5000/files/addfile/${id}`,
        file
      );
      return await response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const allServices = createAsyncThunk(
  "services/allservices",
  async () => {
    try {
      let result = await axios.get(
        "http://localhost:5000/services/allservices"
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }
);

export const allFeeds = createAsyncThunk("files/allfeeds", async () => {
  try {
    let result = await axios.get("http://localhost:5000/files/allfeeds");
    return result;
  } catch (error) {
    console.log(error);
  }
});

export const ProjectFiles = createAsyncThunk("/files/file/:id", async (id) => {
  try {
    let result = await axios.get(`http://localhost:5000/files/file/${id}`);
    return result;
  } catch (error) {
    console.log(error);
  }
});

export const delService = createAsyncThunk(
  "/services/deleteservice/:id",
  async (id) => {
    try {
      let result = await axios.delete(
        `http://localhost:5000/services/deleteservice/${id}`
      );

      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const deleteFile = createAsyncThunk(
  "/files/deletefile/:fileId",
  async ({ fileId }) => {
    try {
      let result = await axios.delete(
        `http://localhost:5000/files/deletefile/${fileId}`
      );
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addFeed = createAsyncThunk(
  "/files/feedback/:id/",
  async ({ fileId, feed }) => {
    try {
      let result = await axios.put(
        `http://localhost:5000/files/feedback/${fileId}`,
        feed
      );

      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  services: [],
  files: [],
  feeds: [],
  status: "",
  isLoading: false,
};
export const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {},
  extraReducers: {
    [ProjectFiles.pending]: (state) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [ProjectFiles.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.files = action.payload?.data?.files;
      state.isLoading = false;
    },
    [ProjectFiles.failed]: (state) => {
      state.status = "failed";
      state.isLoading = false;
    },
    [allFeeds.pending]: (state) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [allFeeds.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.feeds = action.payload?.data?.allfeeds;
      state.isLoading = false;
    },
    [allFeeds.failed]: (state) => {
      state.status = "failed";
      state.isLoading = false;
    },
    [addServiceFile.pending]: (state) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [addServiceFile.fulfilled]: (state) => {
      state.status = "fulfilled";
      state.isLoading = false;
    },
    [addServiceFile.failed]: (state) => {
      state.status = "failed";
      state.isLoading = false;
    },
    [addFile.pending]: (state) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [addFile.fulfilled]: (state) => {
      state.status = "fulfilled";
      state.isLoading = false;
    },
    [addFile.failed]: (state) => {
      state.status = "failed";
      state.isLoading = false;
    },
    [addService.pending]: (state) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [addService.fulfilled]: (state) => {
      state.status = "fulfilled";
      state.isLoading = false;
    },
    [addService.failed]: (state) => {
      state.status = "failed";
      state.isLoading = false;
    },
    [allServices.pending]: (state) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [allServices.fulfilled]: (state, action) => {
      state.status = "success";
      state.services = action.payload?.data.services;
      state.isLoading = false;
    },
    [allServices.rejected]: (state) => {
      state.status = "fail";
      state.isLoading = false;
    },
    [delService.pending]: (state) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [delService.rejected]: (state) => {
      state.status = "fail";
      state.isLoading = false;
    },
    [delService.fulfilled]: (state, action) => {
      state.status = "success";
      state.services = action.payload?.services;
      state.isLoading = false;
    },
    [deleteFile.pending]: (state) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [deleteFile.rejected]: (state) => {
      state.status = "fail";
      state.isLoading = false;
    },
    [deleteFile.fulfilled]: (state, action) => {
      state.status = "success";
      state.isLoading = false;
    },
    [addFeed.pending]: (state) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [addFeed.rejected]: (state) => {
      state.status = "fail";
      state.isLoading = false;
    },
    [addFeed.fulfilled]: (state, action) => {
      state.status = "success";
      state.isLoading = false;
      state.feeds = action.payload?.result;
    },
  },
});

export default serviceSlice.reducer;
