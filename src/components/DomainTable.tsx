import { Table, TableProps } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import ActionMenu from "./ActionMenu";

export interface DataType {
  _id: string;
  domain: string;
  isActive: boolean;
  status: "pending" | "verified" | "rejected";
  more: string;
}

const columns: TableProps<DataType>["columns"] = [
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
    render: (value, record) => {
      return <ActionMenu record={record} />;
    },
  },
];

const data: DataType[] = [
  {
    _id: "1",
    domain: "https://dash.getsitecontrol.com/sites/256247/dashboard",
    isActive: true,
    status: "pending",
    more: "",
  },
  {
    _id: "2",
    domain: "https://foxnews.uk/",
    isActive: false,
    status: "verified",
    more: "",
  },
  {
    _id: "3",
    domain: "https://analytics.google.com/analytics/web/",
    isActive: false,
    status: "rejected",
    more: "",
  },
];

const DomainTable = () => (
  <Table<DataType>
    columns={columns}
    pagination={false}
    // bordered={true}
    scroll={{ x: 800 }}
    dataSource={data}
  />
);

export default DomainTable;
