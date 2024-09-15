// 模拟后端动态生成路由
import { defineFakeRoute } from "vite-plugin-fake-server/client";

/**
 * 模拟 admin 角色
 */
const permissionRouter = {
  name: "Permission",
  path: "/permission",
  component: "",
  meta: {
    title: "权限管理",
    icon: "ep:lollipop",
    extraIcon: "",
    enterTransition: "",
    leaveTransition: "",
    activePath: "",
    redirect: "",
    frameSrc: "",
    frameLoading: false,
    keepAlive: false,
    hiddenTag: false,
    fixedTag: false,
    showLink: true,
    showParent: false,
    rank: 10
  },
  children: [
    {
      name: "PermissionPage",
      path: "/permission/page/index",
      component: "",
      meta: {
        title: "页面权限",
        icon: "",
        extraIcon: "",
        enterTransition: "",
        leaveTransition: "",
        activePath: "",
        redirect: "",
        frameSrc: "",
        frameLoading: false,
        keepAlive: false,
        hiddenTag: false,
        fixedTag: false,
        showLink: true,
        showParent: false
      }
    },
    {
      name: "PermissionButtonRouter",
      path: "/permission/button",
      component: "",
      meta: {
        title: "按钮权限",
        icon: "",
        extraIcon: "",
        enterTransition: "",
        leaveTransition: "",
        activePath: "",
        redirect: "",
        frameSrc: "",
        frameLoading: false,
        keepAlive: false,
        hiddenTag: false,
        fixedTag: false,
        showLink: true,
        showParent: false
      },
      children: [
        {
          name: "PermissionButtonRouter",
          path: "/permission/button/router",
          component: "permission/button/index",
          meta: {
            title: "路由返回按钮权限",
            icon: "",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            redirect: "",
            frameSrc: "",
            frameLoading: false,
            keepAlive: false,
            hiddenTag: false,
            fixedTag: false,
            showLink: true,
            showParent: false,
            auths: [
              "permission:btn:add",
              "permission:btn:edit",
              "permission:btn:delete"
            ]
          }
        },
        {
          name: "PermissionButtonLogin",
          path: "/permission/button/login",
          component: "permission/button/perms",
          meta: {
            title: "登录接口返回按钮权限",
            icon: "",
            extraIcon: "",
            enterTransition: "",
            leaveTransition: "",
            activePath: "",
            redirect: "",
            frameSrc: "",
            frameLoading: false,
            keepAlive: false,
            hiddenTag: false,
            fixedTag: false,
            showLink: true,
            showParent: false
          }
        }
      ]
    }
  ]
};

export default defineFakeRoute([
  {
    url: "/api/routes/user",
    method: "get",
    response: () => {
      return [permissionRouter];
    }
  }
]);
