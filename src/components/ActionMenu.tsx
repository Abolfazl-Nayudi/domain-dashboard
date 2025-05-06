import { MoreOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu, message } from "antd";
import {
  useDeleteDomainMutation,
  useUpdateDomainMutation,
} from "../features/domainApi";
import { DomainDataType } from "../types";
import { useState } from "react";
import DomainDrawer from "./DomainDrawer";
import { destoryMessage, showMessage } from "../utility/messagePopupUtils";

type MenuItem = Required<MenuProps>["items"][number];

const ActionMenu = ({ record }: { record: DomainDataType }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [deleteDomain] = useDeleteDomainMutation();
  const [updateDomain] = useUpdateDomainMutation();

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
              label:
                record?.status === "pending" || record?.status === "rejected"
                  ? "Verify"
                  : "Reject",
              className: `font-semibold `,
              onClick: async () => {
                const textCondition =
                  record?.status === "pending" || record?.status === "rejected";

                showMessage(
                  "update",
                  "loading",
                  `domain is ${textCondition ? "verifying" : "rejecting"}`
                );
                const { data, error } = await updateDomain({
                  id: record.id,
                  status: textCondition ? "verified" : "rejected",
                });
                message.destroy("update");

                if (error) {
                  showMessage(
                    "updaate-error",
                    "error",
                    "there is a problem in verifying the domain",
                    2
                  );
                }

                if (data) {
                  showMessage(
                    "updaate-success",
                    "success",
                    `domain ${data.status} successfully`,
                    2
                  );
                }
              },
            },
            {
              key: "3",
              label: `${record?.isActive ? "Deactivate" : "Activate"}`,
              className: "font-semibold",
              onClick: async () => {
                showMessage("update", "loading", "domain is activating");
                const { data, error } = await updateDomain({
                  id: record?.id,
                  isActive: !record.isActive,
                });
                message.destroy("update");

                if (error) {
                  showMessage(
                    "updaate-error",
                    "error",
                    "there is a problem in activating the domain"
                  );
                }

                if (data) {
                  showMessage(
                    "updaate-success",
                    "success",
                    `domain ${
                      record.isActive ? "deactivated" : "activated"
                    } successfully`
                  );
                }
              },
            },

            { key: "4", label: "install script", disabled: true },
            {
              key: "5",
              label: "Edit",
              className: "text-blue-500 font-semibold",
              onClick: () => {
                setIsDrawerOpen(true);
              },
            },
            {
              key: "6",
              label: "Delete",
              className: "text-red-500 font-semibold",
              onClick: async () => {
                showMessage("delete-loading", "loading", "deleting the domain");

                const { data, error } = await deleteDomain(record.id);
                destoryMessage("delete-loading");

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
      <DomainDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        type="edit"
        domainData={record}
      />
    </>
  );
};

export default ActionMenu;
