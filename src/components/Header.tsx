import { Col, Row, Typography } from "antd";
import { useState } from "react";
import DomainDrawer from "./DomainDrawer";
import SortBy from "./SortBy";
import SearchInput from "./SearchInput";
import ButtonComponent from "./Button";
import { PlusOutlined } from "@ant-design/icons";

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <header className="mb-10 p-6">
      <Typography.Title
        level={1}
        className="font-thin text-3xl text-center md:text-start "
      >
        Domains
      </Typography.Title>
      <Row justify={"space-between"}>
        <Col
          xs={24}
          md={5}
          className="mb-4 flex justify-center md:justify-start"
        >
          <ButtonComponent
            text="Add Domain"
            handler={() => setIsDrawerOpen(true)}
            icon={<PlusOutlined />}
            className="px-10 py-6"
          />
          <DomainDrawer
            type="add"
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
          />
        </Col>
        <Col xs={24} md={14}>
          <div className="flex  gap-3 w-full justify-center md:justify-end">
            <SortBy />
            <SearchInput />
          </div>
        </Col>
      </Row>
    </header>
  );
};

export default Header;
