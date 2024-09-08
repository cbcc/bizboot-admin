export default {
  path: "/system",
  meta: {
    icon: "ri:settings-3-line",
    title: "系统管理",
    rank: 1
  },
  children: [
    {
      path: "/system/user",
      name: "用户管理",
      component: () => import("@/views/system/user/index.vue"),
      meta: {
        title: "用户管理"
      }
    },
    {
      path: "/system/role",
      name: "角色管理",
      component: () => import("@/views/system/role/index.vue"),
      meta: {
        title: "角色管理"
      }
    },
    {
      path: "/system/menu",
      name: "菜单管理",
      component: () => import("@/views/system/menu/index.vue"),
      meta: {
        title: "菜单管理"
      }
    },
    {
      path: "/system/dept",
      name: "部门管理",
      component: () => import("@/views/system/dept/index.vue"),
      meta: {
        title: "部门管理"
      }
    }
  ]
};
