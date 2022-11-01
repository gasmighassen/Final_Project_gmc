import { configureStore } from "@reduxjs/toolkit";
import serviceSlice from "./slices/serviceSlice";
import projectSlice from "./slices/projectSlice";
import userSlice from "./slices/userSlice";
import documentSlice from "./slices/documentSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    project: projectSlice,
    service: serviceSlice,
    document: documentSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
