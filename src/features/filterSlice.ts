import { createSlice } from "@reduxjs/toolkit";
import { SortByCriteriaType } from "../types";

type InitialStateType = {
  searchTerm: string;
  sortBy: SortByCriteriaType;
};

export const filterSlice = createSlice({
  name: "domainFilter",
  initialState: {
    searchTerm: "",
    sortBy: "asc" as InitialStateType["sortBy"],
  },
  reducers: {
    setSearchTerm: (state, action: { payload: string; type: string }) => {
      state.searchTerm = action.payload;
    },
    setSortBy: (
      state,
      action: { payload: InitialStateType["sortBy"]; type: string }
    ) => {
      state.sortBy = action.payload;
    },
  },
});

export const { setSearchTerm, setSortBy } = filterSlice.actions;
