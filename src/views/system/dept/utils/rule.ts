import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  name: [{ required: true, message: "部门名称为必填项", trigger: "blur" }],
  type: [{ required: true, message: "部门类型为必填项", trigger: "blur" }]
});
