import { notification } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";

export const openNotificationWithIcon = ({
  type,
  title,
  description,
}: {
  type: NotificationType;
  title: string;
  description: string;
}): void => {
  notification[type]({
    message: title,
    description,
  });
};
