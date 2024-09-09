/**
 * 部门
 */
export type Dept = BaseData & {
  parentId?: number;
  name: string;
  type: number;
  sort?: number;
  enabled: boolean;
  remark: string;
};

/**
 * 角色
 */
export type Role = BaseData & {
  name: string;
  code: string;
  enabled: boolean;
  remark: string;
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
