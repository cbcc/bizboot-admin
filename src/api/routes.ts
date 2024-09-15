import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";
import type { Route } from "@/data/entity";

/** 查询当前用户路由 */
export const getRouteByCurrentUser = () => {
  return http.request<Array<Route>>("get", baseUrlApi("/routes/user"));
};
