import { Button } from "antd";
import { ReactNode } from "react";

type ButtonProps = {
  text: string;
  handler: () => void;
  className?: string;
  icon?: ReactNode;
  type?: "submit" | "button" | "reset";
  disabled?: boolean;
};

export default function ButtonComponent({
  text,
  handler,
  className,
  icon,
  type,
  disabled,
}: ButtonProps) {
  return (
    <Button
      className={`${className} rounded-sm bg-blue-400 `}
      onClick={handler}
      color="primary"
      variant="solid"
      size="large"
      icon={icon}
      htmlType={type}
      disabled={disabled}
    >
      {text}
    </Button>
  );
}
