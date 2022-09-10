import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from '../features/API/apiSlice'
import filterSliceReducer from "../features/filterSlice";
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    filters: filterSliceReducer
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
