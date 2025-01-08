// import userAvatar from "@/assets/user.jpg";
import type { NotificationWithRead } from "@/data/entity";

export type NotificationItem = NotificationWithRead & {
  avatar?: string;
  status?: "primary" | "success" | "warning" | "info" | "danger";
  extra?: string;
};
