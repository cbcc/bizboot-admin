import { defineStore } from "pinia";
import {
  type userType,
  store,
  router,
  resetRouter,
  routerArrays,
  storageLocal
} from "../utils";
import { login, refreshToken } from "@/api/user";
import { useMultiTagsStoreHook } from "./multiTags";
import { type DataInfo, setToken, removeToken, userKey } from "@/utils/auth";
import type { LoginResult, RefreshResult } from "@/data/entity";

export const useUserStore = defineStore({
  id: "pure-user",
  state: (): userType => ({
    // 头像
    avatar: storageLocal().getItem<DataInfo<number>>(userKey)?.avatar ?? "",
    // 用户名
    username: storageLocal().getItem<DataInfo<number>>(userKey)?.username ?? "",
    // 昵称
    nickname: storageLocal().getItem<DataInfo<number>>(userKey)?.nickname ?? "",
    // 性别
    gender: storageLocal().getItem<DataInfo<number>>(userKey)?.gender,
    // 手机号
    phone: storageLocal().getItem<DataInfo<number>>(userKey)?.phone ?? "",
    // 邮箱
    email: storageLocal().getItem<DataInfo<number>>(userKey)?.email ?? "",
    // 部门名称
    deptName: storageLocal().getItem<DataInfo<number>>(userKey)?.deptName ?? "",
    // 页面级别权限
    roles: storageLocal().getItem<DataInfo<number>>(userKey)?.roles ?? [],
    // 按钮级别权限
    permissions:
      storageLocal().getItem<DataInfo<number>>(userKey)?.permissions ?? [],
    // 是否勾选了登录页的免登录
    isRemembered: false,
    // 登录页的免登录存储几天，默认7天
    loginDay: 7
  }),
  actions: {
    /** 存储头像 */
    SET_AVATAR(avatar: string) {
      this.avatar = avatar;
    },
    /** 存储用户名 */
    SET_USERNAME(username: string) {
      this.username = username;
    },
    /** 存储昵称 */
    SET_NICKNAME(nickname: string) {
      this.nickname = nickname;
    },
    /** 存储性别 */
    SET_GENDER(gender: number) {
      this.gender = gender;
    },
    /** 存储手机号 */
    SET_PHONE(phone: string) {
      this.phone = phone;
    },
    /** 存储邮箱 */
    SET_EMAIL(email: string) {
      this.email = email;
    },
    /** 存储部门名称 */
    SET_DEPT_NAME(deptName: string) {
      this.deptName = deptName;
    },
    /** 存储角色 */
    SET_ROLES(roles: Array<string>) {
      this.roles = roles;
    },
    /** 存储按钮级别权限 */
    SET_PERMS(permissions: Array<string>) {
      this.permissions = permissions;
    },
    /** 存储是否勾选了登录页的免登录 */
    SET_IS_REMEMBERED(bool: boolean) {
      this.isRemembered = bool;
    },
    /** 设置登录页的免登录存储几天 */
    SET_LOGIN_DAY(value: number) {
      this.loginDay = Number(value);
    },
    /** 登入 */
    async loginByUsername(data) {
      return new Promise<LoginResult>((resolve, reject) => {
        login(data)
          .then(data => {
            setToken(data);
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    /** 前端登出（不调用接口） */
    logOut() {
      this.username = "";
      this.roles = [];
      this.permissions = [];
      removeToken();
      useMultiTagsStoreHook().handleTags("equal", [...routerArrays]);
      resetRouter();
      router.push("/login");
    },
    /** 刷新`token` */
    async handRefreshToken(data) {
      return new Promise<RefreshResult>((resolve, reject) => {
        refreshToken(data)
          .then(data => {
            if (data) {
              setToken(data);
              resolve(data);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
});

export function useUserStoreHook() {
  return useUserStore(store);
}
