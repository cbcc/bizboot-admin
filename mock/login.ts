// 根据角色动态生成路由
import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/api/login",
    method: "post",
    response: ({ body }) => {
      if (body.username === "admin") {
        return {
          accessToken: "eyJhbGciOiJIUzUxMiJ9.admin",
          refreshToken: "eyJhbGciOiJIUzUxMiJ9.adminRefresh",
          expires: "2030/10/30 00:00:00",
          username: "admin",
          nickname: "",
          gender: 1,
          phone: "13412345678",
          deptName: "丐帮"
        };
      } else {
        return {
          accessToken: "eyJhbGciOiJIUzUxMiJ9.common",
          refreshToken: "eyJhbGciOiJIUzUxMiJ9.commonRefresh",
          expires: "2030/10/30 00:00:00",
          username: "common",
          nickname: "",
          gender: 1,
          phone: "13412345680",
          deptName: "丐帮"
        };
      }
    }
  }
]);
