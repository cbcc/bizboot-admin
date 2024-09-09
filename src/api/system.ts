import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";
import type { Dept, PageResult, Role } from "@/data/entity";

type Result = {
  success: boolean;
  data?: Array<any>;
};

type ResultTable = {
  success: boolean;
  data?: {
    /** 列表数据 */
    list: Array<any>;
    /** 总条目数 */
    total?: number;
    /** 每页显示条目个数 */
    pageSize?: number;
    /** 当前页数 */
    currentPage?: number;
  };
};

/** 获取系统管理-用户管理列表 */
export const getUserList = (data?: object) => {
  return http.request<ResultTable>("post", baseUrlApi("/user"), { data });
};

/** 系统管理-用户管理-获取所有角色列表 */
export const getAllRoleList = () => {
  return http.request<Result>("get", baseUrlApi("/all"));
};

/** 系统管理-用户管理-根据userId，获取对应角色id列表（userId：用户id） */
export const getRoleIds = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("/list-role-ids"), { data });
};

/** 获取系统管理-菜单管理列表 */
export const getMenuList = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("/menu"), { data });
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

/** 获取角色管理-权限-菜单权限 */
export const getRoleMenu = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("/role-menu"), { data });
};

/** 获取角色管理-权限-菜单权限-根据角色 id 查对应菜单 */
export const getRoleMenuIds = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("/role-menu-ids"), { data });
};
