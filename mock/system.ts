import { defineFakeRoute } from "vite-plugin-fake-server/client";
import { faker } from "@faker-js/faker/locale/zh_CN";

export default defineFakeRoute([
  // 用户管理
  {
    url: "/api/users",
    method: "get",
    response: () => {
      return {
        content: [
          {
            id: 1,
            username: "孙悟空",
            nickname: "猴子",
            gender: 1,
            phone: "13412345678",
            email: faker.internet.email(),
            password: "123456",
            enabled: true,
            createdTime: "2024-09-10T07:37:16",
            createdBy: "system",
            lastModifiedTime: "2024-09-10T09:22:27",
            lastModifiedBy: "system",
            dept: null
          },
          {
            id: 2,
            username: "猪悟能",
            nickname: "八戒",
            gender: 1,
            phone: "13412345678",
            email: faker.internet.email(),
            password: "123456",
            enabled: false,
            createdTime: "2024-09-09T23:40:11",
            createdBy: "system",
            lastModifiedTime: "2024-09-10T09:27:34",
            lastModifiedBy: "system",
            dept: null
          }
        ],
        page: {
          size: 20,
          number: 0,
          totalElements: 2,
          totalPages: 1
        }
      };
    }
  },
  // 角色管理
  {
    url: "/api/roles",
    method: "get",
    response: () => {
      return {
        content: [
          {
            id: 1,
            name: "超级管理员",
            code: "admin",
            enabled: true,
            remark: "超级管理员拥有最高权限",
            createdTime: "2024-09-09T07:44:28",
            createdBy: "system",
            lastModifiedTime: "2024-09-09T07:47:41",
            lastModifiedBy: "system"
          },
          {
            id: 2,
            name: "测试",
            code: "test",
            enabled: false,
            remark: "测试人员",
            createdTime: "2024-09-09T07:45:03",
            createdBy: "system",
            lastModifiedTime: "2024-09-09T07:48:11",
            lastModifiedBy: "system"
          }
        ],
        page: {
          size: 20,
          number: 0,
          totalElements: 2,
          totalPages: 1
        }
      };
    }
  },
  // 角色管理-权限-菜单权限-根据角色 id 查对应菜单
  {
    url: "/api/roles/:id/menus",
    method: "get",
    response: ({ params }) => {
      if (params.id == "1") {
        return [
          100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 200, 201, 202,
          203, 204, 205, 300, 301, 302, 303, 304, 400, 401, 402, 403, 404, 500,
          501, 502, 503
        ];
      } else if (params.id == "2") {
        return [
          100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 404, 500, 501,
          502, 503
        ];
      }
    }
  },
  // 菜单管理
  {
    url: "/api/menus",
    method: "get",
    response: () => {
      return [
        // 外部页面
        {
          parentId: 0,
          id: 100,
          type: 0, // 菜单类型（0-菜单、1-iframe、2-外链、3-按钮）
          title: "menus.pureExternalPage",
          name: "PureIframe",
          path: "/iframe",
          component: "",
          sort: 7,
          redirect: "",
          icon: "ri:links-fill",
          extraIcon: "",
          enterTransition: "",
          leaveTransition: "",
          activePath: "",
          auths: "",
          frameSrc: "",
          frameLoading: true,
          keepAlive: false,
          hiddenTag: false,
          fixedTag: false,
          showLink: true,
          showParent: false
        },
        {
          parentId: 100,
          id: 101,
          type: 0,
          title: "menus.pureExternalDoc",
          name: "PureIframeExternal",
          path: "/iframe/external",
          component: "",
          sort: null,
          redirect: "",
          icon: "",
          extraIcon: "",
          enterTransition: "",
          leaveTransition: "",
          activePath: "",
          auths: "",
          frameSrc: "",
          frameLoading: true,
          keepAlive: false,
          hiddenTag: false,
          fixedTag: false,
          showLink: true,
          showParent: false
        },
        {
          parentId: 101,
          id: 102,
          type: 2,
          title: "menus.pureExternalLink",
          name: "https://pure-admin.github.io/pure-admin-doc",
          path: "/external",
          component: "",
          sort: null,
          redirect: "",
          icon: "",
          extraIcon: "",
          enterTransition: "",
          leaveTransition: "",
          activePath: "",
          auths: "",
          frameSrc: "",
          frameLoading: true,
          keepAlive: false,
          hiddenTag: false,
          fixedTag: false,
          showLink: true,
          showParent: false
        },
        {
          parentId: 101,
          id: 103,
          type: 2,
          title: "menus.pureUtilsLink",
          name: "https://pure-admin-utils.netlify.app/",
          path: "/pureUtilsLink",
          component: "",
          sort: null,
          redirect: "",
          icon: "",
          extraIcon: "",
          enterTransition: "",
          leaveTransition: "",
          activePath: "",
          auths: "",
          frameSrc: "",
          frameLoading: true,
          keepAlive: false,
          hiddenTag: false,
          fixedTag: false,
          showLink: true,
          showParent: false
        },
        {
          parentId: 100,
          id: 104,
          type: 1,
          title: "menus.pureEmbeddedDoc",
          name: "PureIframeEmbedded",
          path: "/iframe/embedded",
          component: "",
          sort: null,
          redirect: "",
          icon: "",
          extraIcon: "",
          enterTransition: "",
          leaveTransition: "",
          activePath: "",
          auths: "",
          frameSrc: "",
          frameLoading: true,
          keepAlive: false,
          hiddenTag: false,
          fixedTag: false,
          showLink: true,
          showParent: false
        },
        {
          parentId: 104,
          id: 105,
          type: 1,
          title: "menus.pureEpDoc",
          name: "FrameEp",
          path: "/iframe/ep",
          component: "",
          sort: null,
          redirect: "",
          icon: "",
          extraIcon: "",
          enterTransition: "",
          leaveTransition: "",
          activePath: "",
          auths: "",
          frameSrc: "https://element-plus.org/zh-CN/",
          frameLoading: true,
          keepAlive: true,
          hiddenTag: false,
          fixedTag: false,
          showLink: true,
          showParent: false
        },
        {
          parentId: 104,
          id: 106,
          type: 1,
          title: "menus.pureTailwindcssDoc",
          name: "FrameTailwindcss",
          path: "/iframe/tailwindcss",
          component: "",
          sort: null,
          redirect: "",
          icon: "",
          extraIcon: "",
          enterTransition: "",
          leaveTransition: "",
          activePath: "",
          auths: "",
          frameSrc: "https://tailwindcss.com/docs/installation",
          frameLoading: true,
          keepAlive: true,
          hiddenTag: false,
          fixedTag: false,
          showLink: true,
          showParent: false
        },
        {
          parentId: 104,
          id: 107,
          type: 1,
          title: "menus.pureVueDoc",
          name: "FrameVue",
          path: "/iframe/vue3",
          component: "",
          sort: null,
          redirect: "",
          icon: "",
          extraIcon: "",
          enterTransition: "",
          leaveTransition: "",
          activePath: "",
          auths: "",
          frameSrc: "https://cn.vuejs.org/",
          frameLoading: true,
          keepAlive: true,
          hiddenTag: false,
          fixedTag: false,
          showLink: true,
          showParent: false
        },
        {
          parentId: 104,
          id: 108,
          type: 1,
          title: "menus.pureViteDoc",
          name: "FrameVite",
          path: "/iframe/vite",
          component: "",
          sort: null,
          redirect: "",
          icon: "",
          extraIcon: "",
          enterTransition: "",
          leaveTransition: "",
          activePath: "",
          auths: "",
          frameSrc: "https://cn.vitejs.dev/",
          frameLoading: true,
          keepAlive: true,
          hiddenTag: false,
          fixedTag: false,
          showLink: true,
          showParent: false
        },
        {
          parentId: 104,
          id: 109,
          type: 1,
          title: "menus.purePiniaDoc",
          name: "FramePinia",
          path: "/iframe/pinia",
          component: "",
          sort: null,
          redirect: "",
          icon: "",
          extraIcon: "",
          enterTransition: "",
          leaveTransition: "",
          activePath: "",
          auths: "",
          frameSrc: "https://pinia.vuejs.org/zh/index.html",
          frameLoading: true,
          keepAlive: true,
          hiddenTag: false,
          fixedTag: false,
          showLink: true,
          showParent: false
        },
        {
          parentId: 104,
          id: 110,
          type: 1,
          title: "menus.pureRouterDoc",
          name: "FrameRouter",
          path: "/iframe/vue-router",
          component: "",
          sort: null,
          redirect: "",
          icon: "",
          extraIcon: "",
          enterTransition: "",
          leaveTransition: "",
          activePath: "",
          auths: "",
          frameSrc: "https://router.vuejs.org/zh/",
          frameLoading: true,
          keepAlive: true,
          hiddenTag: false,
          fixedTag: false,
          showLink: true,
          showParent: false
        },
        // 权限管理
        {
          parentId: 0,
          id: 200,
          type: 0,
          title: "menus.purePermission",
          name: "PurePermission",
          path: "/permission",
          component: "",
          sort: 9,
          redirect: "",
          icon: "ep:lollipop",
          extraIcon: "",
          enterTransition: "",
          leaveTransition: "",
          activePath: "",
          auths: "",
          frameSrc: "",
          frameLoading: true,
          keepAlive: false,
          hiddenTag: false,
          fixedTag: false,
          showLink: true,
          showParent: false
        },
        {
          parentId: 200,
          id: 201,
          type: 0,
          title: "menus.purePermissionPage",
          name: "PermissionPage",
          path: "/permission/page/index",
          component: "",
          sort: null,
          redirect: "",
          icon: "",
          extraIcon: "",
          enterTransition: "",
          leaveTransition: "",
          activePath: "",
          auths: "",
          frameSrc: "",
          frameLoading: true,
          keepAlive: false,
          hiddenTag: false,
          fixedTag: false,
          showLink: true,
          showParent: false
        },
        {
          parentId: 200,
          id: 202,
          type: 0,
          title: "menus.purePermissionButton",
          name: "PermissionButton",
          path: "/permission/button",
          component: "",
          sort: null,
          redirect: "",
          icon: "",
          extraIcon: "",
          enterTransition: "",
          leaveTransition: "",
          activePath: "",
          auths: "",
          frameSrc: "",
          frameLoading: true,
          keepAlive: false,
          hiddenTag: false,
          fixedTag: false,
          showLink: true,
          showParent: false
        },
        {
          parentId: 202,
          id: 203,
          type: 0,
          title: "menus.purePermissionButtonRouter",
          name: "PermissionButtonRouter",
          path: "/permission/button/router",
          component: "permission/button/index",
          sort: null,
          redirect: "",
          icon: "",
          extraIcon: "",
          enterTransition: "",
          leaveTransition: "",
          activePath: "",
          auths: "",
          frameSrc: "",
          frameLoading: true,
          keepAlive: false,
          hiddenTag: false,
          fixedTag: false,
          showLink: true,
          showParent: false
        },
        {
          parentId: 203,
          id: 210,
          type: 3,
          title: "添加",
          name: "",
          path: "",
          component: "",
          sort: null,
          redirect: "",
          icon: "",
          extraIcon: "",
          enterTransition: "",
          leaveTransition: "",
          activePath: "",
          auths: "permission:btn:add",
          frameSrc: "",
          frameLoading: true,
          keepAlive: false,
          hiddenTag: false,
          fixedTag: false,
          showLink: true,
          showParent: false
        },
        {
          parentId: 203,
          id: 211,
          type: 3,
          title: "修改",
          name: "",
          path: "",
          component: "",
          sort: null,
          redirect: "",
          icon: "",
          extraIcon: "",
          enterTransition: "",
          leaveTransition: "",
          activePath: "",
          auths: "permission:btn:edit",
          frameSrc: "",
          frameLoading: true,
          keepAlive: false,
          hiddenTag: false,
          fixedTag: false,
          showLink: true,
          showParent: false
        },
        {
          parentId: 203,
          id: 212,
          type: 3,
          title: "删除",
          name: "",
          path: "",
          component: "",
          sort: null,
          redirect: "",
          icon: "",
          extraIcon: "",
          enterTransition: "",
          leaveTransition: "",
          activePath: "",
          auths: "permission:btn:delete",
          frameSrc: "",
          frameLoading: true,
          keepAlive: false,
          hiddenTag: false,
          fixedTag: false,
          showLink: true,
          showParent: false
        },
        {
          parentId: 202,
          id: 204,
          type: 0,
          title: "menus.purePermissionButtonLogin",
          name: "PermissionButtonLogin",
          path: "/permission/button/login",
          component: "permission/button/perms",
          sort: null,
          redirect: "",
          icon: "",
          extraIcon: "",
          enterTransition: "",
          leaveTransition: "",
          activePath: "",
          auths: "",
          frameSrc: "",
          frameLoading: true,
          keepAlive: false,
          hiddenTag: false,
          fixedTag: false,
          showLink: true,
          showParent: false
        },
        {
          parentId: 204,
          id: 220,
          type: 3,
          title: "添加",
          name: "",
          path: "",
          component: "",
          sort: null,
          redirect: "",
          icon: "",
          extraIcon: "",
          enterTransition: "",
          leaveTransition: "",
          activePath: "",
          auths: "permission:btn:add",
          frameSrc: "",
          frameLoading: true,
          keepAlive: false,
          hiddenTag: false,
          fixedTag: false,
          showLink: true,
          showParent: false
        },
        {
          parentId: 204,
          id: 221,
          type: 3,
          title: "修改",
          name: "",
          path: "",
          component: "",
          sort: null,
          redirect: "",
          icon: "",
          extraIcon: "",
          enterTransition: "",
          leaveTransition: "",
          activePath: "",
          auths: "permission:btn:edit",
          frameSrc: "",
          frameLoading: true,
          keepAlive: false,
          hiddenTag: false,
          fixedTag: false,
          showLink: true,
          showParent: false
        },
        {
          parentId: 204,
          id: 222,
          type: 3,
          title: "删除",
          name: "",
          path: "",
          component: "",
          sort: null,
          redirect: "",
          icon: "",
          extraIcon: "",
          enterTransition: "",
          leaveTransition: "",
          activePath: "",
          auths: "permission:btn:delete",
          frameSrc: "",
          frameLoading: true,
          keepAlive: false,
          hiddenTag: false,
          fixedTag: false,
          showLink: true,
          showParent: false
        },
        // 系统管理
        {
          parentId: 0,
          id: 300,
          type: 0,
          title: "menus.pureSysManagement",
          name: "PureSystem",
          path: "/system",
          component: "",
          sort: 10,
          redirect: "",
          icon: "ri:settings-3-line",
          extraIcon: "",
          enterTransition: "",
          leaveTransition: "",
          activePath: "",
          auths: "",
          frameSrc: "",
          frameLoading: true,
          keepAlive: false,
          hiddenTag: false,
          fixedTag: false,
          showLink: true,
          showParent: false
        },
        {
          parentId: 300,
          id: 301,
          type: 0,
          title: "menus.pureUser",
          name: "SystemUser",
          path: "/system/user/index",
          component: "",
          sort: null,
          redirect: "",
          icon: "ri:admin-line",
          extraIcon: "",
          enterTransition: "",
          leaveTransition: "",
          activePath: "",
          auths: "",
          frameSrc: "",
          frameLoading: true,
          keepAlive: false,
          hiddenTag: false,
          fixedTag: false,
          showLink: true,
          showParent: false
        },
        {
          parentId: 300,
          id: 302,
          type: 0,
          title: "menus.pureRole",
          name: "SystemRole",
          path: "/system/role/index",
          component: "",
          sort: null,
          redirect: "",
          icon: "ri:admin-fill",
          extraIcon: "",
          enterTransition: "",
          leaveTransition: "",
          activePath: "",
          auths: "",
          frameSrc: "",
          frameLoading: true,
          keepAlive: false,
          hiddenTag: false,
          fixedTag: false,
          showLink: true,
          showParent: false
        },
        {
          parentId: 300,
          id: 303,
          type: 0,
          title: "menus.pureSystemMenu",
          name: "SystemMenu",
          path: "/system/menu/index",
          component: "",
          sort: null,
          redirect: "",
          icon: "ep:menu",
          extraIcon: "",
          enterTransition: "",
          leaveTransition: "",
          activePath: "",
          auths: "",
          frameSrc: "",
          frameLoading: true,
          keepAlive: false,
          hiddenTag: false,
          fixedTag: false,
          showLink: true,
          showParent: false
        },
        {
          parentId: 300,
          id: 304,
          type: 0,
          title: "menus.pureDept",
          name: "SystemDept",
          path: "/system/dept/index",
          component: "",
          sort: null,
          redirect: "",
          icon: "ri:git-branch-line",
          extraIcon: "",
          enterTransition: "",
          leaveTransition: "",
          activePath: "",
          auths: "",
          frameSrc: "",
          frameLoading: true,
          keepAlive: false,
          hiddenTag: false,
          fixedTag: false,
          showLink: true,
          showParent: false
        },
        // 系统监控
        {
          parentId: 0,
          id: 400,
          type: 0,
          title: "menus.pureSysMonitor",
          name: "PureMonitor",
          path: "/monitor",
          component: "",
          sort: 11,
          redirect: "",
          icon: "ep:monitor",
          extraIcon: "",
          enterTransition: "",
          leaveTransition: "",
          activePath: "",
          auths: "",
          frameSrc: "",
          frameLoading: true,
          keepAlive: false,
          hiddenTag: false,
          fixedTag: false,
          showLink: true,
          showParent: false
        },
        {
          parentId: 400,
          id: 401,
          type: 0,
          title: "menus.pureOnlineUser",
          name: "OnlineUser",
          path: "/monitor/online-user",
          component: "monitor/online/index",
          sort: null,
          redirect: "",
          icon: "ri:user-voice-line",
          extraIcon: "",
          enterTransition: "",
          leaveTransition: "",
          activePath: "",
          auths: "",
          frameSrc: "",
          frameLoading: true,
          keepAlive: false,
          hiddenTag: false,
          fixedTag: false,
          showLink: true,
          showParent: false
        },
        {
          parentId: 400,
          id: 402,
          type: 0,
          title: "menus.pureLoginLog",
          name: "LoginLog",
          path: "/monitor/login-logs",
          component: "monitor/logs/login/index",
          sort: null,
          redirect: "",
          icon: "ri:window-line",
          extraIcon: "",
          enterTransition: "",
          leaveTransition: "",
          activePath: "",
          auths: "",
          frameSrc: "",
          frameLoading: true,
          keepAlive: false,
          hiddenTag: false,
          fixedTag: false,
          showLink: true,
          showParent: false
        },
        {
          parentId: 400,
          id: 403,
          type: 0,
          title: "menus.pureOperationLog",
          name: "OperationLog",
          path: "/monitor/operation-logs",
          component: "monitor/logs/operation/index",
          sort: null,
          redirect: "",
          icon: "ri:history-fill",
          extraIcon: "",
          enterTransition: "",
          leaveTransition: "",
          activePath: "",
          auths: "",
          frameSrc: "",
          frameLoading: true,
          keepAlive: false,
          hiddenTag: false,
          fixedTag: false,
          showLink: true,
          showParent: false
        },
        {
          parentId: 400,
          id: 404,
          type: 0,
          title: "menus.pureSystemLog",
          name: "SystemLog",
          path: "/monitor/system-logs",
          component: "monitor/logs/system/index",
          sort: null,
          redirect: "",
          icon: "ri:file-search-line",
          extraIcon: "",
          enterTransition: "",
          leaveTransition: "",
          activePath: "",
          auths: "",
          frameSrc: "",
          frameLoading: true,
          keepAlive: false,
          hiddenTag: false,
          fixedTag: false,
          showLink: true,
          showParent: false
        },
        // 标签页操作
        {
          parentId: 0,
          id: 500,
          type: 0,
          title: "menus.pureTabs",
          name: "PureTabs",
          path: "/tabs",
          component: "",
          sort: 12,
          redirect: "",
          icon: "ri:bookmark-2-line",
          extraIcon: "",
          enterTransition: "",
          leaveTransition: "",
          activePath: "",
          auths: "",
          frameSrc: "",
          frameLoading: true,
          keepAlive: false,
          hiddenTag: false,
          fixedTag: false,
          showLink: true,
          showParent: false
        },
        {
          parentId: 500,
          id: 501,
          type: 0,
          title: "menus.pureTabs",
          name: "Tabs",
          path: "/tabs/index",
          component: "",
          sort: null,
          redirect: "",
          icon: "",
          extraIcon: "",
          enterTransition: "",
          leaveTransition: "",
          activePath: "",
          auths: "",
          frameSrc: "",
          frameLoading: true,
          keepAlive: false,
          hiddenTag: false,
          fixedTag: false,
          showLink: true,
          showParent: false
        },
        {
          parentId: 500,
          id: 502,
          type: 0,
          title: "query传参模式",
          name: "TabQueryDetail",
          path: "/tabs/query-detail",
          component: "",
          sort: null,
          redirect: "",
          icon: "",
          extraIcon: "",
          enterTransition: "",
          leaveTransition: "",
          activePath: "/tabs/index",
          auths: "",
          frameSrc: "",
          frameLoading: true,
          keepAlive: false,
          hiddenTag: false,
          fixedTag: false,
          showLink: false,
          showParent: false
        },
        {
          parentId: 500,
          id: 503,
          type: 0,
          title: "params传参模式",
          name: "TabParamsDetail",
          path: "/tabs/params-detail/:id",
          component: "params-detail",
          sort: null,
          redirect: "",
          icon: "",
          extraIcon: "",
          enterTransition: "",
          leaveTransition: "",
          activePath: "/tabs/index",
          auths: "",
          frameSrc: "",
          frameLoading: true,
          keepAlive: false,
          hiddenTag: false,
          fixedTag: false,
          showLink: false,
          showParent: false
        }
      ];
    }
  },
  // 部门管理
  {
    url: "/api/depts",
    method: "get",
    response: () => {
      return {
        content: [
          {
            id: 1,
            createdDate: "2024-09-06T05:10:12",
            createdBy: "system",
            lastModifiedDate: "2024-09-06T05:11:20",
            lastModifiedBy: "system",
            parentId: 0,
            name: "丐帮",
            type: 1,
            sort: 1,
            enabled: true,
            remark: "天下第一"
          },
          {
            id: 2,
            createdDate: "2024-09-05T21:10:21",
            createdBy: "system",
            lastModifiedDate: "2024-09-05T21:10:21",
            lastModifiedBy: "system",
            parentId: 1,
            name: "丐帮佛山分部",
            type: 2,
            sort: 1,
            enabled: true,
            remark: ""
          },
          {
            id: 3,
            createdDate: "2024-09-05T21:10:21",
            createdBy: "system",
            lastModifiedDate: "2024-09-05T21:10:21",
            lastModifiedBy: "system",
            parentId: 1,
            name: "丐帮广州分部",
            type: 2,
            sort: 2,
            enabled: true,
            remark: ""
          },
          {
            id: 4,
            createdDate: "2024-09-06T05:10:12",
            createdBy: "system",
            lastModifiedDate: "2024-09-06T05:11:20",
            lastModifiedBy: "system",
            parentId: 0,
            name: "佛门",
            type: 1,
            sort: 1,
            enabled: true,
            remark: ""
          }
        ],
        page: {
          size: 20,
          number: 0,
          totalElements: 3,
          totalPages: 1
        }
      };
    }
  },
  // 通知公告
  {
    url: "/api/notifications",
    method: "get",
    response: () => {
      return {
        content: [
          {
            id: 1,
            createdTime: "2024-09-15T08:00:00",
            createdBy: "system",
            lastModifiedTime: "2024-10-03T09:39:50",
            lastModifiedBy: "system",
            title: "公告",
            context: "测试公告",
            type: 0,
            active: true
          },
          {
            id: 2,
            createdTime: "2024-09-15T08:00:00",
            createdBy: "system",
            lastModifiedTime: "2024-09-15T08:00:00",
            lastModifiedBy: "system",
            title: "消息",
            context: "测试消息",
            type: 1,
            active: true
          }
        ],
        page: {
          size: 20,
          number: 0,
          totalElements: 2,
          totalPages: 1
        }
      };
    }
  }
]);
