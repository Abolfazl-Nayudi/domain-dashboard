import React, { useEffect } from "react";
import { MoreOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu, message } from "antd";
import {
  useDeleteDomainMutation,
  useUpdateDomainMutation,
} from "../features/domainApi";
import { DomainDataType } from "../types";
import { NoticeType } from "antd/es/message/interface";

type MenuItem = Required<MenuProps>["items"][number];

const showMessage = (
  key: string,
  type: NoticeType,
  content: string,
  duration?: number
) => {
  console.log(key, duration);

  message.open({
    key,
    type,
    content,
    duration,
  });
};

const ActionMenu = ({ record }: { record: DomainDataType }) => {
  // antd message

  // RTK Query hooks
  const [
    deleteDomain,
    { isLoading: deleteLoading, error: deleteError, isSuccess: deleteSuccess },
  ] = useDeleteDomainMutation();
  const [
    updateDomain,
    { isLoading: updateLoading, error: updateError, isSuccess: updateSuccess },
  ] = useUpdateDomainMutation();

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
              disabled: record.status === "verified" ? true : false,
              className: "font-semibold",
              onClick: async () => {
                showMessage("update", "loading", "domain is verifying");
                const { data, error } = await updateDomain({
                  id: record.id,
                  status: "verified",
                });
                message.destroy("update");

                if (error) {
                  showMessage(
                    "updaate-error",
                    "error",
                    "there is a problem in verifying the domain"
                  );
                }

                if (data) {
                  showMessage(
                    "updaate-success",
                    "success",
                    "domain verified successfully"
                  );
                }
              },
            },
            { key: "3", label: "install script", disabled: true },
            {
              key: "4",
              label: "Delete",
              className: "text-red-500 font-semibold",
              onClick: async () => {
                showMessage("delete", "loading", "deleting the domain");

                const { data, error } = await deleteDomain(record.id);
                message.destroy("delete");

                if (error) {
                  showMessage(
                    "delete-error",
                    "error",
                    "there is a problem in deleting the domain",
                    3
                  );
                }

                if (data) {
                  showMessage(
                    "delete-success",
                    "success",
                    "domain is deleted",
                    3
                  );
                }
              },
            },
          ],
        },
      ],
    },
  ];

  return (
    <>
      <Menu
        className="w-5 [&_.ant-menu-submenu-title]:hover:bg-transparent [&_.ant-menu-submenu-title]:p-0 [&_.ant-menu-submenu-title]:bg-none border-e-0  "
        mode="vertical"
        items={items}
        expandIcon={false}
        selectable={false}
      />
    </>
  );
};

export default ActionMenu;
