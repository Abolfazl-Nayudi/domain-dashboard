import React, { useState } from "react";
import { Drawer, Typography } from "antd";
import ButtonComponent from "./Button";
import { PlusOutlined } from "@ant-design/icons";
import AddDomainForm from "./AddDomainForm";

const AddDomainDrawer = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ButtonComponent
        text="Add Domain"
        handler={showDrawer}
        icon={<PlusOutlined />}
        className="px-10 py-6"
      />
      <Drawer width={600} onClose={onClose} open={open}>
        <div className="h-[95%]">
          <Typography.Title level={3}>Add domain</Typography.Title>
          <AddDomainForm />
        </div>
      </Drawer>
    </>
  );
};

export default AddDomainDrawer;
