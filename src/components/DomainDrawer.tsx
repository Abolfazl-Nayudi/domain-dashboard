import React from "react";
import { Drawer, Typography } from "antd";
import { DomainDataType, DomainFormType } from "../types";
import DomainForm from "./DomainForm";

type DomainDrawerProps = {
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: DomainFormType;
  domainData?: DomainDataType;
};

const DomainDrawer = ({
  isDrawerOpen,
  setIsDrawerOpen,
  type,
  domainData,
}: DomainDrawerProps) => {
  return (
    <>
      <Drawer
        width={600}
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
      >
        <div className="h-[95%]">
          <Typography.Title level={3}>
            {type === "add" ? "Add" : "Edit"} domain
          </Typography.Title>
          <DomainForm
            setIsDrawerOpen={setIsDrawerOpen}
            type={type}
            domainData={domainData}
          />
        </div>
      </Drawer>
    </>
  );
};

export default DomainDrawer;
