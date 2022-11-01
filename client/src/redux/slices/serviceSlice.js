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
  "/files/deletefile/:service/:file",
  async ({ service, file }) => {
    try {
      let result = await axios.put(
        `http://localhost:5000/files/deletefile/${service}/${file}`
      );
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addFeed = createAsyncThunk(
  "/files/addfeed/:id",
  async ({ id, feed }) => {
    try {
      let result = await axios.put(
        `http://localhost:5000/files/addfeed/${id}`,
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
};
export const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {},
  extraReducers: {
    [ProjectFiles.pending]: (state) => {
      state.status = "pending";
    },
    [ProjectFiles.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.files = action.payload?.data?.files;
    },
    [ProjectFiles.failed]: (state) => {
      state.status = "failed";
    },
    [allFeeds.pending]: (state) => {
      state.status = "pending";
    },
    [allFeeds.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.feeds = action.payload?.data?.allfeeds;
    },
    [allFeeds.failed]: (state) => {
      state.status = "failed";
    },
    [addServiceFile.pending]: (state) => {
      state.status = "pending";
    },
    [addServiceFile.fulfilled]: (state) => {
      state.status = "fulfilled";
    },
    [addServiceFile.failed]: (state) => {
      state.status = "failed";
    },
    [addFile.pending]: (state) => {
      state.status = "pending";
    },
    [addFile.fulfilled]: (state) => {
      state.status = "fulfilled";
    },
    [addFile.failed]: (state) => {
      state.status = "failed";
    },
    [addService.pending]: (state) => {
      state.status = "pending";
    },
    [addService.fulfilled]: (state) => {
      state.status = "fulfilled";
    },
    [addService.failed]: (state) => {
      state.status = "failed";
    },
    [allServices.pending]: (state) => {
      state.status = "pending";
    },
    [allServices.fulfilled]: (state, action) => {
      state.status = "success";
      state.services = action.payload?.data.services;
    },
    [allServices.rejected]: (state) => {
      state.status = "fail";
    },
    [delService.pending]: (state) => {
      state.status = "pending";
    },
    [delService.rejected]: (state) => {
      state.status = "fail";
    },
    [delService.fulfilled]: (state, action) => {
      state.status = "success";
      state.services = action.payload?.services;
    },
    [deleteFile.pending]: (state) => {
      state.status = "pending";
    },
    [deleteFile.rejected]: (state) => {
      state.status = "fail";
    },
    [deleteFile.fulfilled]: (state, action) => {
      state.status = "success";
    },
    [addFeed.pending]: (state) => {
      state.status = "pending";
    },
    [addFeed.rejected]: (state) => {
      state.status = "fail";
    },
    [addFeed.fulfilled]: (state, action) => {
      state.status = "success";
      // state.files = action.payload?.result;
    },
  },
});

export default serviceSlice.reducer;
