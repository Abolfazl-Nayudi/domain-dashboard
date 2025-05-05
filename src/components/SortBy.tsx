import { Select } from "antd";
import React from "react";

const SortBy = () => {
  console.log("hi");

  const handleChange = (value: string) => {
    console.log(value);
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
