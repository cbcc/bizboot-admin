/**
 * 用户
 */
export type User = BaseData & {
  username: string;
  nickname?: string;
  gender?: number;
  phone: string | number;
  email?: string;
  password: string;
  enabled: boolean;
  dept?: Dept;
};

/**
 * 部门
 */
export type Dept = BaseData & {
  parentId?: number;
  name: string;
  type: number;
  sort?: number;
  enabled: boolean;
  remark?: string;
};

/**
 * 角色
 */
export type Role = BaseData & {
  name: string;
  code: string;
  enabled: boolean;
  remark?: string;
};

/**
 * 菜单
 */
export type Menu = BaseData & {
  type: number;
  parentId: number;
  title: string;
  name: string;
  path: string;
  component: string;
  icon: string;
  extraIcon: string;
  enterTransition: string;
  leaveTransition: string;
  activePath: string;
  redirect: string;
  auths: string;
  frameSrc: string;
  frameLoading: boolean;
  keepAlive: boolean;
  hiddenTag: boolean;
  fixedTag: boolean;
  showLink: boolean;
  showParent: boolean;
  sort: number;
};

/**
 * 路由
 */
export type Route = {
  name: string;
  path: string;
  component: string;
  meta: {
    title: string;
    icon: string;
    extraIcon: string;
    enterTransition: string;
    leaveTransition: string;
    activePath: string;
    redirect: string;
    frameSrc: string;
    frameLoading: boolean;
    keepAlive: boolean;
    hiddenTag: boolean;
    fixedTag: boolean;
    showLink: boolean;
    showParent: boolean;
    rank: number;
    auths: string[];
  };
  children: Route[];
};

export type LoginResult = {
  /** `token` */
  accessToken: string;
  /** 用于调用刷新`accessToken`的接口时所需的`token` */
  refreshToken: string;
  /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
  expires: Date;
  /** 用户信息 */
  avatar: string;
  username: string;
  nickname: string;
  gender: number;
  phone: string;
  email: string;
  deptName: string;
  roles: string[];
  permissions: string[];
};

export type RefreshResult = {
  /** `token` */
  accessToken: string;
  /** 用于调用刷新`accessToken`的接口时所需的`token` */
  refreshToken: string;
  /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
  expires: Date;
};

export type PageResult<T> = {
  content: Array<T>;
  page: Page;
};

export type Page = {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
};

export type BaseData = {
  id: number;
  createdTime: string;
  createdBy: string;
  lastModifiedTime: string;
  lastModifiedBy: string;
};
