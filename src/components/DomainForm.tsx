import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import ButtonComponent from "./Button";
import {
  useAddDomainMutation,
  useUpdateDomainMutation,
} from "../features/domainApi";
import { v4 as uuid } from "uuid";
import { DomainDataType, DomainFormType } from "../types";
import { destoryMessage, showMessage } from "../utility/messagePopupUtils";

type FieldType = {
  domain: string;
};

type ComponentProps = {
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: DomainFormType;
  domainData?: DomainDataType;
};

const DomainForm = ({ setIsDrawerOpen, type, domainData }: ComponentProps) => {
  const [addDomain, { isLoading: addDomainLoading }] = useAddDomainMutation();
  const [updateDomain, { isLoading: updateDomainLoading }] =
    useUpdateDomainMutation();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    if (type === "add") {
      const domainData = {
        id: uuid(),
        domain: values.domain,
        isActive: false,
        status: "pending" as const,
        createdDate: Date.now(),
      };
      setIsDrawerOpen(false);
      showMessage("add-domain-loading", "loading", "adding the Domain");
      const { data, error } = await addDomain(domainData);
      destoryMessage("add-domain-loading");

      if (error) {
        showMessage(
          "add-domain-error",
          "error",
          "there is a problem in deleting the domain"
        );
      }

      if (data) {
        showMessage(
          "add-domain-success",
          "success",
          "Domain added successfully"
        );
      }
    }

    if (type === "edit") {
      setIsDrawerOpen(false);
      showMessage("update-domain-loading", "loading", "updating the Domain");
      const { data, error } = await updateDomain({
        id: domainData?.id,
        domain: values.domain,
      });
      destoryMessage("update-domain-loading");

      if (error) {
        showMessage(
          "update-domain-error",
          "error",
          "there is a problem in deleting the domain"
        );
      }

      if (data) {
        showMessage(
          "update-domain-success",
          "success",
          "Domain updated successfully"
        );
      }
    }
  };

  // const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
  //   errorInfo
  // ) => {
  //   console.log("Failed:", errorInfo);
  // };
  if (type === "edit") {
    return (
      <Form
        className="h-full flex  flex-col justify-between"
        initialValues={{ domain: domainData?.domain }}
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
          <Input
            placeholder="Ex: https://www.bridged.media"
            className="py-3"
            // defaultValue={domainData?.domain}
          />
        </Form.Item>

        <Form.Item label={null} className="flex justify-end ">
          <Button
            variant="outlined"
            className="w-25 h-13 me-3 rounded-sm"
            onClick={() => setIsDrawerOpen(false)}
          >
            Cancel
          </Button>
          <ButtonComponent
            text={"Update"}
            handler={() => {}}
            disabled={updateDomainLoading}
            className="w-25 h-13"
            type="submit"
          />
        </Form.Item>
      </Form>
    );
  }

  if (type === "add") {
    return (
      <Form
        className="h-full flex  flex-col justify-between"
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
            onClick={() => setIsDrawerOpen(false)}
          >
            Cancel
          </Button>
          <ButtonComponent
            text={"Add"}
            handler={() => {}}
            disabled={addDomainLoading}
            className="w-25 h-13"
            type="submit"
          />
        </Form.Item>
      </Form>
    );
  }
};

export default DomainForm;
