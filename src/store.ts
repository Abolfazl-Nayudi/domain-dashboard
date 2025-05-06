import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { domainApi } from "./features/domainApi";
import { filterSlice } from "./features/filterSlice";

export const store = configureStore({
  reducer: {
    [domainApi.reducerPath]: domainApi.reducer,
    [filterSlice.reducerPath]: filterSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(domainApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
