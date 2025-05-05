import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import ButtonComponent from "./Button";

type FieldType = {
  domain: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const AddDomainForm = () => (
  <Form
    name="basic"
    // labelCol={{ span: 8 }}
    // wrapperCol={{ span: 16 }}
    // style={{ maxWidth: 600 }}
    className="h-full flex  flex-col justify-between"
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      name="domain"
      rules={[{ required: true, message: "Domain is required!" }]}
    >
      <Input placeholder="Ex: https://www.bridged.media" className="py-3" />
    </Form.Item>

    <Form.Item label={null} className="flex justify-end ">
      <Button variant="outlined" className="px-8 py-6 me-3 rounded-sm">
        Cancel
      </Button>
      <ButtonComponent text="Add" handler={() => {}} type="submit" />
    </Form.Item>
  </Form>
);

export default AddDomainForm;
