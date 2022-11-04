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
};
export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: {
    [addProject.pending]: (state) => {
      state.status = "pending";
    },
    [addProject.fulfilled]: (state) => {
      state.status = "fulfilled";
    },
    [addProject.failed]: (state) => {
      state.status = "failed";
    },
    [allProjects.pending]: (state) => {
      state.status = "pending";
    },
    [allProjects.fulfilled]: (state, action) => {
      state.status = "success";
      state.projects = action.payload?.data.projects;
    },
    [allProjects.rejected]: (state) => {
      state.status = "fail";
    },
    [getUserProjects.pending]: (state) => {
      state.status = "pending";
    },
    [getUserProjects.rejected]: (state) => {
      state.status = "fail";
    },
    [getUserProjects.fulfilled]: (state, action) => {
      state.status = "success";
      state.userProjects = action.payload?.result;
    },
    [deleteProjects.pending]: (state) => {
      state.status = "pending";
    },
    [deleteProjects.rejected]: (state) => {
      state.status = "fail";
    },
    [deleteProjects.fulfilled]: (state) => {
      state.status = "success";
    },
  },
});

export default projectSlice.reducer;
