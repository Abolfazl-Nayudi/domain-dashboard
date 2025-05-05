import { Button } from "antd";
import { ReactNode } from "react";

type ButtonProps = {
  text: string;
  handler: () => void;
  className?: string;
  icon?: ReactNode;
  type?: "submit" | "button" | "reset";
};

export default function ButtonComponent({
  text,
  handler,
  className,
  icon,
  type,
}: ButtonProps) {
  return (
    <Button
      className={`${className} rounded-sm bg-blue-400 px-10 py-6`}
      onClick={handler}
      color="primary"
      variant="solid"
      size="large"
      icon={icon}
      htmlType={type}
    >
      {text}
    </Button>
  );
}
