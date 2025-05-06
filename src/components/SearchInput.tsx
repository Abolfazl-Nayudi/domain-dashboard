import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../features/filterSlice";

const SearchInput = () => {
  const dispatch = useDispatch();

  return (
    <Input
      size="large"
      placeholder="search"
      className="max-w-80 w-full"
      onChange={(e) => dispatch(setSearchTerm(e.target.value))}
      prefix={<SearchOutlined />}
    />
  );
};

export default SearchInput;
