import { reactive } from "vue";
import type { FormRules } from "element-plus";
import { isPhone, isEmail } from "@pureadmin/utils";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  nickname: [{ required: true, message: "昵称为必填项", trigger: "blur" }],
  username: [{ required: true, message: "用户名为必填项", trigger: "blur" }],
  password: [{ required: true, message: "密码为必填项", trigger: "blur" }],
  phone: [
    {
      required: true,
      validator: (rule, value, callback) => {
        if (!value) {
          callback(new Error("手机号为必填项"));
        } else if (!isPhone(value)) {
          callback(new Error("请输入正确的手机号码格式"));
        } else {
          callback();
        }
      },
      trigger: "blur"
      // trigger: "click" // 如果想在点击确定按钮时触发这个校验，trigger 设置成 click 即可
    }
  ],
  email: [
    {
      validator: (rule, value, callback) => {
        if (value === null || value === "") {
          callback();
        } else if (!isEmail(value)) {
          callback(new Error("请输入正确的邮箱格式"));
        } else {
          callback();
        }
      },
      trigger: "change"
    }
  ],
  deptId: [{ required: true, message: "归属部门为必填项", trigger: "change" }]
});
