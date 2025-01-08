import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";
import type {
  LoginResult,
  NotificationWithRead,
  PageResult,
  RefreshResult
} from "@/data/entity";

/** 登录 */
export const login = (data?: object) => {
  return http.request<LoginResult>("post", baseUrlApi("/login"), { data });
};

/** 刷新 token */
export const refreshToken = (data?: object) => {
  return http.request<RefreshResult>("post", baseUrlApi("/refresh-token"), {
    data
  });
};

/** 修改密码 */
export const updatePassword = (data?: object) => {
  return http.request<null>("patch", baseUrlApi("/users/me/password"), {
    data
  });
};

/** 查询通知 */
export const getNotifications = (params?: object) => {
  return http.request<PageResult<NotificationWithRead>>(
    "get",
    baseUrlApi("/notifications/me"),
    { params }
  );
};

/** 查询未读通知数量 */
export const getUnReadNotificationCount = (params?: object) => {
  return http.request<number>(
    "get",
    baseUrlApi("/notifications/me/unread/count"),
    { params }
  );
};

/** 标记通知为已读 */
export const readNotification = (id: number) => {
  return http.request<null>(
    "patch",
    baseUrlApi(`/notifications/me/${id}/read`)
  );
};
