import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";
import type { User, Dept, Role, Menu, PageResult } from "@/data/entity";

/** 用户-分页查询 */
export const findUsers = (params?: object) => {
  return http.request<PageResult<User>>("get", baseUrlApi("/users"), {
    params
  });
};

/** 用户-新增 */
export const createUser = (data?: object) => {
  return http.request<User>("post", baseUrlApi("/users"), { data });
};

/** 用户-修改 */
export const updateUser = (id: number, data?: object) => {
  return http.request<null>("put", baseUrlApi(`/users/${id}`), { data });
};

/** 用户-修改状态 */
export const updateUserEnabled = (id: number, data?: object) => {
  return http.request<null>("patch", baseUrlApi(`/users/${id}/enabled`), {
    data
  });
};

/** 用户-查询用户角色 id 列表 */
export const getUserRoleIds = (id: number) => {
  return http.request<Array<number>>("get", baseUrlApi(`/users/${id}/roles`));
};

/** 用户-修改用户角色 */
export const updateUserRoles = (id: number, data?: object) => {
  return http.request<null>("patch", baseUrlApi(`/users/${id}/roles`), {
    data
  });
};

/** 用户-删除 */
export const deleteUser = (id: number) => {
  return http.request<null>("delete", baseUrlApi(`/users/${id}`));
};

/** 部门-分页查询 */
export const findDepts = (params?: object) => {
  return http.request<PageResult<Dept>>("get", baseUrlApi("/depts"), {
    params
  });
};

/** 部门-新增 */
export const createDept = (data?: object) => {
  return http.request<Dept>("post", baseUrlApi("/depts"), { data });
};

/** 部门-修改 */
export const updateDept = (id: number, data?: object) => {
  return http.request<null>("put", baseUrlApi(`/depts/${id}`), { data });
};

/** 部门-删除 */
export const deleteDept = (id: number) => {
  return http.request<null>("delete", baseUrlApi(`/depts/${id}`));
};

/** 角色-分页查询 */
export const findRoles = (params?: object) => {
  return http.request<PageResult<Role>>("get", baseUrlApi("/roles"), {
    params
  });
};

/** 角色-新增 */
export const createRole = (data?: object) => {
  return http.request<Role>("post", baseUrlApi("/roles"), { data });
};

/** 角色-修改 */
export const updateRole = (id: number, data?: object) => {
  return http.request<null>("put", baseUrlApi(`/roles/${id}`), { data });
};

/** 角色-修改状态 */
export const updateRoleEnabled = (id: number, data?: object) => {
  return http.request<null>("patch", baseUrlApi(`/roles/${id}/enabled`), {
    data
  });
};

/** 角色-删除 */
export const deleteRole = (id: number) => {
  return http.request<null>("delete", baseUrlApi(`/roles/${id}`));
};

/** 角色-查询角色菜单 id 列表 */
export const getRoleMenuIds = (id: number) => {
  return http.request<Array<number>>("get", baseUrlApi(`/roles/${id}/menus`));
};

/** 角色-修改角色菜单 */
export const updateRoleMenus = (id: number, data?: object) => {
  return http.request<null>("patch", baseUrlApi(`/roles/${id}/menus`), {
    data
  });
};

/** 菜单-列表查询 */
export const findMenus = (params?: object) => {
  return http.request<Array<Menu>>("get", baseUrlApi("/menus"), { params });
};

/** 菜单-新增 */
export const createMenu = (data?: object) => {
  return http.request<Menu>("post", baseUrlApi("/menus"), { data });
};

/** 菜单-修改 */
export const updateMenu = (id: number, data?: object) => {
  return http.request<null>("put", baseUrlApi(`/menus/${id}`), { data });
};

/** 菜单-删除 */
export const deleteMenu = (id: number) => {
  return http.request<null>("delete", baseUrlApi(`/menus/${id}`));
};
