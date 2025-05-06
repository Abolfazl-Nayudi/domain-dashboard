import { Select } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { setSortBy } from "../features/filterSlice";
import { SortByCriteriaType } from "../types";

const SortBy = () => {
  console.log("hi");

  const dispatch = useDispatch();

  const handleChange = (value: SortByCriteriaType) => {
    dispatch(setSortBy(value));
  };

  return (
    <Select
      className=" h-13 rounded-sm max-w-50 w-full"
      defaultValue="asc"
      style={{ width: 120 }}
      onChange={handleChange}
      options={[
        { value: "asc", label: "Order By Ascending", className: "" },
        { value: "desc", label: "Order By Descending" },
      ]}
    />
  );
};

export default SortBy;
