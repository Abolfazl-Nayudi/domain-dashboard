import React from "react";
import { MoreOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { DataType } from "./DomainTable";

type MenuItem = Required<MenuProps>["items"][number];

// const onClick: MenuProps["onClick"] = (e) => {
//   console.log("click", e);
// };

const ActionMenu = (record: DataType) => {
  console.log("recrod in action mentu ", record);

  const items: MenuItem[] = [
    {
      key: "sub1",
      icon: <MoreOutlined className="text-xl" />,
      className: "bg-transparent p-0",
      children: [
        {
          key: "1-1",
          type: "group",
          className: "w-60",
          children: [
            {
              key: "1",
              label: "View pages",
              disabled: true,
            },
            {
              key: "2",
              label: "Verify",
              className: "font-semibold",
              onClick: () => {
                console.log("verified");
              },
            },
            { key: "3", label: "install script", disabled: true },
            {
              key: "4",
              label: "Delete",
              className: "text-red-500 font-semibold",
              onClick: () => {
                console.log("deleted");
              },
            },
          ],
        },
      ],
    },
  ];

  return (
    <Menu
      // onClick={onClick}
      className="w-5 [&_.ant-menu-submenu-title]:hover:bg-transparent [&_.ant-menu-submenu-title]:p-0 [&_.ant-menu-submenu-title]:bg-none border-e-0  "
      mode="vertical"
      items={items}
      expandIcon={false}
      selectable={false}
    />
  );
};

export default ActionMenu;
