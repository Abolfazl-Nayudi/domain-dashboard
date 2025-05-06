import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import ButtonComponent from "./Button";
import {
  useAddDomainMutation,
  useGetDomainsQuery,
} from "../features/domainApi";
import { v4 as uuid } from "uuid";

type FieldType = {
  domain: string;
};

type ComponentProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddDomainForm = ({ setOpen }: ComponentProps) => {
  const [addDomain, { isLoading, error }] = useAddDomainMutation();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const domainData = {
      id: uuid(),
      domain: values.domain,
      isActive: false,
      status: "pending" as const,
      createdDate: Date.now(),
    };

    await addDomain(domainData);
  };

  // const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
  //   errorInfo
  // ) => {
  //   console.log("Failed:", errorInfo);
  // };

  return (
    <Form
      className="h-full flex  flex-col justify-between"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        name="domain"
        rules={[
          { required: true, message: "Domain is required!" },
          {
            pattern: /^(https?:\/\/)?([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}$/,
            message: "Please enter a valid domain like https://example.com",
          },
        ]}
      >
        <Input placeholder="Ex: https://www.bridged.media" className="py-3" />
      </Form.Item>

      <Form.Item label={null} className="flex justify-end ">
        <Button
          variant="outlined"
          className="w-25 h-13 me-3 rounded-sm"
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
        <ButtonComponent
          text={`${isLoading ? "Adding..." : "Add"}`}
          handler={() => {}}
          disabled={isLoading}
          className="w-25 h-13"
          type="submit"
        />
      </Form.Item>
    </Form>
  );
};

export default AddDomainForm;
