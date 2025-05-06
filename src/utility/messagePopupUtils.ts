import { message } from "antd";
import { NoticeType } from "antd/es/message/interface";

export const showMessage = (
  key: string,
  type: NoticeType,
  content: string,
  duration?: number
) => {
  message.open({
    key,
    type,
    content,
    duration,
  });
};

export const destoryMessage = (key: string) => {
  message.destroy(key);
};
