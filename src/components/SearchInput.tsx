import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";

const SearchInput = () => {
  return (
    <Input
      size="large"
      placeholder="search"
      className="max-w-80 w-full"
      prefix={<SearchOutlined />}
    />
  );
};

export default SearchInput;
