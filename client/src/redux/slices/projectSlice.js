import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addProject = createAsyncThunk(
  "project/addproject",
  async (project) => {
    try {
      let response = await axios.post(
        "http://localhost:5000/project/addproject",
        project
      );
      return await response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const allProjects = createAsyncThunk("project/all", async () => {
  try {
    let result = axios.get("http://localhost:5000/project/all");
    return result;
  } catch (error) {
    console.log(error);
  }
});

export const getUserProjects = createAsyncThunk(
  "/project/userprojects/:id",
  async (id) => {
    console.log(id);
    try {
      let result = await axios.get(
        `http://localhost:5000/project/userprojects/${id}`
      );
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteProjects = createAsyncThunk(
  "/project/deletepro/:id",
  async (id) => {
    try {
      let result = await axios.delete(
        `http://localhost:5000/project/deletepro/${id}`
      );
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
);

//update project with new service
export const addServiceToProject = createAsyncThunk(
  "/project/project/:id",
  async (id, newService) => {
    try {
      let result = axios.put(
        `http://localhost:5000/project/project/${id}`,
        newService
      );

      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  projects: [],
  userProjects: [],
  status: "",
  isLoading: false,
};
export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: {
    [addProject.pending]: (state) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [addProject.fulfilled]: (state) => {
      state.status = "fulfilled";
      state.isLoading = false;
    },
    [addProject.failed]: (state) => {
      state.status = "failed";
      state.isLoading = false;
    },
    [allProjects.pending]: (state) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [allProjects.fulfilled]: (state, action) => {
      state.status = "success";
      state.projects = action.payload?.data.projects;
      state.isLoading = false;
    },
    [allProjects.rejected]: (state) => {
      state.status = "fail";
      state.isLoading = false;
    },
    [getUserProjects.pending]: (state) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [getUserProjects.rejected]: (state) => {
      state.status = "fail";
      state.isLoading = false;
    },
    [getUserProjects.fulfilled]: (state, action) => {
      state.status = "success";
      state.userProjects = action.payload?.result;
      state.isLoading = false;
    },
    [deleteProjects.pending]: (state) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [deleteProjects.rejected]: (state) => {
      state.status = "fail";
      state.isLoading = false;
    },
    [deleteProjects.fulfilled]: (state) => {
      state.status = "success";
      state.isLoading = false;
    },
  },
});

export default projectSlice.reducer;
