import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";
import type { LoginResult, RefreshResult } from "@/data/entity";

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
