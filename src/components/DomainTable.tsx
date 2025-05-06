import { Alert, Table, TableProps } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import ActionMenu from "./ActionMenu";
import { useGetDomainsQuery } from "../features/domainApi";
import { DomainDataType } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const columns: TableProps<DomainDataType>["columns"] = [
  {
    title: "Domain URL",
    className: "font-normal text-gray-500 bg-transparent",
    dataIndex: "domain",
    key: "domain",
    render: (value: string, { isActive }) => {
      return isActive ? (
        <div className="flex items-center ">
          <span className="inline-block w-3.5 h-3.5 rounded-full bg-green-500 me-2"></span>
          <span className="text-black">{value}</span>
        </div>
      ) : (
        <div>
          <ExclamationCircleOutlined className="me-2 text-red-600" />
          <span className="text-black">{value}</span>
        </div>
      );
    },
  },
  {
    title: "Active Status",
    className: "font-normal text-gray-500 bg-transparent",
    dataIndex: "isActive",
    key: "isActive",
    render: (value: boolean) => {
      return value ? (
        <span className="text-green-600">Active</span>
      ) : (
        <span className="text-red-600">Not Active</span>
      );
    },
  },
  {
    title: "Verification Status",
    className: "font-normal text-gray-500 bg-transparent",
    dataIndex: "status",
    key: "status",
    render: (value: string) => {
      const capitalizedVal = value.charAt(0).toUpperCase() + value.slice(1);

      if (value === "verified")
        return <span className="text-green-600">{capitalizedVal}</span>;
      else if (value === "rejected")
        return <span className="text-red-600">{capitalizedVal}</span>;
      else return <span>{capitalizedVal}</span>;
    },
  },
  {
    title: "_",
    key: "more",
    dataIndex: "more",
    className: "flex justify-end bg-transparent text-transparent",
    render: (record) => {
      return <ActionMenu record={record} />;
    },
  },
];

// const data: DataType[] = [
//   {
//     _id: "1",
//     domain: "https://dash.getsitecontrol.com/sites/256247/dashboard",
//     isActive: true,
//     status: "pending",
//     more: "",
//   },
//   {
//     _id: "2",
//     domain: "https://foxnews.uk/",
//     isActive: false,
//     status: "verified",
//     more: "",
//   },
//   {
//     _id: "3",
//     domain: "https://analytics.google.com/analytics/web/",
//     isActive: false,
//     status: "rejected",
//     more: "",
//   },
// ];

const DomainTable = () => {
  const { data, error, isLoading } = useGetDomainsQuery(undefined);

  const { searchTerm, sortBy } = useSelector(
    (state: RootState) => state.domainFilter
  );

  if (error)
    return (
      <Alert
        message="There is a problem in loading the domains"
        type="error"
        className="text-center"
      />
    );

  let sortedData = data;
  sortedData = sortedData
    ?.filter((domainObj) => domainObj.domain.includes(searchTerm))
    .sort((a, b) => {
      if (sortBy === "asc") return a.createdDate - b.createdDate;
      return b.createdDate - a.createdDate;
    });

  return (
    <Table<DomainDataType>
      loading={isLoading}
      columns={columns}
      pagination={false}
      // bordered={true}
      rowKey={"id"}
      scroll={{ x: 800 }}
      dataSource={sortedData}
    />
  );
};

export default DomainTable;
